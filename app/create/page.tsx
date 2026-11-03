// app/create/page.tsx - PAGE 0 - First step before Process - v0.1.0 future v0.81.0
'use client'
import { useState } from 'react'
export default function Create(){
 const [person,setPerson]=useState(175)
 return (
 <main className="p-6 bg-zinc-950 min-h-screen text-white">
  <h2 className="text-2xl font-bold">PAGE 0 - 2D Image → 3D Space</h2>
  <p className="text-gray-400 text-sm">This creates empty white box for Page 2 center 68%</p>
  <div className="mt-6 grid grid-cols-2 gap-6">
   <div className="border border-dashed border-gray-700 h-64 flex items-center justify-center rounded">Drag & drop JPG/PNG Max 10MB<br/>Show corners & floor</div>
   <div>
    <label>Reference Scale Person: {person}cm (140-200)</label>
    <input type="range" min="140" max="200" value={person} onChange={e=>setPerson(Number(e.target.value))} className="w-full"/>
    <p className="text-xs text-gray-500 mt-2">Formula: scale = {person} / measuredPixelHeight</p>
    <a href="/dashboard" className="mt-6 inline-block bg-white text-black px-6 py-3 rounded">Create 3D Room →</a>
   </div>
  </div>
  <div className="mt-6 text-xs text-gray-500">Output: Wireframe OBJ/GLB Scale Calibrated {person}cm - v0.1.0 - Future: TripoSR single image - Version pro: 0.1.0 now, 0.81.0 future (your v81.0)</div>
 </main>
 )
}