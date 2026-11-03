// Photo Vacuum - iPhone Only Phase 1
// Local-first - Zero Network - 14 Day Vault
// Private repo first, public later

const FM = FileManager.iCloud()
const PATH = FM.joinPath(FM.documentsDirectory(), "PhotoVacuum.json")
const DEFAULTS = { reminderDays: 30, lastClean: null, vault: [], vaultDays: 14 }

const BUCKETS = [
  { label: "0-10 days", min: 0, max: 10 },
  { label: "11-20 days", min: 11, max: 20 },
  { label: "21-30 days", min: 21, max: 30 },
  { label: "31-60 days", min: 31, max: 60 },
  { label: "61-90 days", min: 61, max: 90 },
  { label: "90+ days", min: 91, max: 9999 }
]

const OPTIONS = [10, 30, 90, 180, 0]

function load() {
  if (!FM.fileExists(PATH)) {
    FM.writeString(PATH, JSON.stringify(DEFAULTS))
    return DEFAULTS
  }
  return JSON.parse(FM.readString(PATH))
}

function save(s) {
  FM.writeString(PATH, JSON.stringify(s))
}

let s = load()

let main = new Alert()
main.title = "Photo Vacuum"
main.message = `Buckets: 0-10 to 90+ days\nVault: 14 days\nReminder: ${s.reminderDays === 0 ? "Never" : s.reminderDays + " days"}`
main.addAction("Scan Screenshots")
main.addAction("Vault Expired Check")
main.addAction("Settings: Reminder")
let choice = await main.presentAlert()

// Settings
if (choice === 2) {
  let set = new Alert()
  set.title = "Reminder Setting"
  set.message = "When to remind?"
  OPTIONS.forEach(d => set.addAction(d === 0 ? "Never" : `${d} days`))
  set.addCancelAction("Cancel")
  let r = await set.presentAlert()
  if (r !== -1) {
    s.reminderDays = OPTIONS[r]
    save(s)
    let ok = new Alert()
    ok.title = "Saved"
    ok.message = `Reminder = ${s.reminderDays} days`
    ok.addAction("OK")
    await ok.presentAlert()
  }
}

// Vault Check - 14 days logic
else if (choice === 1) {
  let now = Date.now()
  let expired = s.vault.filter(v => {
    let diff = (now - new Date(v.addedAt).getTime()) / (1000*60*60*24)
    return diff >= s.vaultDays
  })
  
  let vaultAlert = new Alert()
  vaultAlert.title = `Vault: ${expired.length} expired`
  vaultAlert.message = expired.length === 0 ? "No photos expired. All safe." : `${expired.length} photos from 14 days ago.\n\nDelete permanently? Or keep 14 more days?`
  if (expired.length > 0) {
    vaultAlert.addAction("Delete Permanently")
    vaultAlert.addAction("Keep 14 More Days")
  }
  vaultAlert.addCancelAction("Close")
  
  let vChoice = await vaultAlert.presentAlert()
  if (vChoice === 0 && expired.length > 0) {
    // Delete expired
    s.vault = s.vault.filter(v => !expired.includes(v))
    save(s)
  } else if (vChoice === 1 && expired.length > 0) {
    // Extend 14 days
    s.vault.forEach(v => {
      if (expired.includes(v)) {
        v.expiresAt = new Date(now + 14*24*60*60*1000).toISOString()
        v.addedAt = new Date().toISOString()
      }
    })
    save(s)
  }
}

// Scan
else {
  s.lastClean = new Date().toISOString()
  save(s)
  
  let scan = new Alert()
  scan.title = "Scan Done"
  scan.message = BUCKETS.map(b => `${b.label}: 0 photos`).join("\n") + "\n\nFor deleted photos:\n○ Move to Vault for 14 days (Recommended)\n○ Delete Immediately\n\nVault will remind + confirm to delete on day 14."
  scan.addAction("Move to Vault (14 days)")
  scan.addAction("Delete Immediately")
  scan.addCancelAction("Cancel")
  let sChoice = await scan.presentAlert()
  
  if (sChoice === 0) {
    // Simulate adding to vault
    let newItem = {
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14*24*60*60*1000).toISOString()
    }
    s.vault.push(newItem)
    save(s)
  }
}
