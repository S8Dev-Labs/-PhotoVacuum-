// app/page.tsx - Level 2 v0.1.0 - Landing - Future-proof for v0.81.0 - Professional version
export default function Landing(){
 return (
 <main className="min-h-screen bg-black text-white p-6">
  <nav className="flex justify-between"><span className="font-bold">ONE 3D WORLD</span><span className="text-xs">v0.1.0 future→v0.81.0 (your v81.0)</span></nav>
  <section className="mt-20 text-center">
   <h1 className="text-5xl font-bold">ONE 3D WORLD</h1>
   <p className="mt-4 text-gray-400">2D Image → 3D Space → Edit → Export - Person 175cm Scale - Cost $572</p>
   <div className="mt-8 flex justify-center gap-4">
    <a href="/create" className="bg-white text-black px-6 py-3 rounded">Start Free Scan</a>
    <a href="/dashboard" className="border px-6 py-3 rounded">Dashboard (1 metric)</a>
   </div>
   <div className="mt-12 grid grid-cols-3 gap-4 text-left max-w-3xl mx-auto text-sm">
    <div className="border border-gray-800 p-4 rounded"><b>01</b><br/>Import & Scan<br/><span className="text-gray-500">2D photo + LiDAR 1.24M</span></div>
    <div className="border border-gray-800 p-4 rounded"><b>02</b><br/>Process & Clean<br/><span className="text-gray-500">Center 68% Exploded Pick/Omit</span></div>
    <div className="border border-gray-800 p-4 rounded"><b>03</b><br/>Export & Style<br/><span className="text-gray-500">Sun 60% Materials Cost $572</span></div>
   </div>
  </section>
 </main>
 )
}