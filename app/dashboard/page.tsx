// app/dashboard/page.tsx - Level 2 v0.1.0 - Dashboard - 1 metric now, 4 later
'use client'
import { useState } from 'react'
export default function Dashboard(){
 const [center,setCenter]=useState(68)
 const [sun,setSun]=useState(60)
 const cost=2*350 + (center<68? -150:0) + (sun<60? -50:0)
 return(
 <main className="p-6 bg-black min-h-screen text-white">
  <h2 className="text-xl font-bold">Dashboard - Level 2 v0.1.0 - Cost ${cost}</h2>
  <div className="mt-6 grid grid-cols-3 gap-4">
   <div className="bg-zinc-900 p-4 rounded"><p className="text-xs text-gray-500">Scan Quality</p><p className="text-2xl">1.24M pts</p></div>
   <div className="bg-zinc-900 p-4 rounded border border-white"><p className="text-xs text-gray-500">Current Metric - v0.1.0</p><p className="text-2xl">Center {center}%</p></div>
   <div className="bg-zinc-900 p-4 rounded opacity-40"><p className="text-xs">Future v0.81.0 metrics (hidden)</p><p>Sun {sun}%/Mat/Style</p></div>
  </div>
  <div className="mt-6">
   <label>Center Exploded {center}% (Your UX liked 68%)</label>
   <input type="range" min="40" max="100" value={center} onChange={e=>setCenter(Number(e.target.value))} className="w-full"/>
  </div>
  <div className="mt-4">
   <label>Sun {sun}% (Your UX liked 60%)</label>
   <input type="range" min="20" max="100" value={sun} onChange={e=>setSun(Number(e.target.value))} className="w-full"/>
  </div>
  <div className="mt-6 border border-gray-800 h-64 rounded flex items-center justify-center">3D Viewer - Empty White Box - Exploded Center {center}%</div>
  <p className="mt-4 text-xs text-gray-500">v0.1.0: 1 metric visible. v0.81.0 (your v81.0): 4 metrics - Center/Sun/Materials/Style. Cost $572 at 68%/60%. Future-proof structure.</p>
 </main>
 )
}