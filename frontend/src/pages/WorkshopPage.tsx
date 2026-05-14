import { useState } from 'react';
import '../App.css';

function App() {
  return (
    <div className="flex h-screen w-full bg-neutral-900 text-white overflow-hidden">
      
      {/* 1. LEFT BAR: Utilities */}
      <aside className="w-64 bg-neutral-800 border-r border-neutral-700 p-4 shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-green-400">Utilities</h2>
        <p className="text-sm text-neutral-400">Upload land photos and configure landscape settings here.</p>
        {/* Buttons and inputs go here */}
      </aside>

      {/* 2. MIDDLE SCREEN: 3D Renderer */}
      <main className="flex-1 relative bg-black">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
          <p className="mb-2">3D Landscape Canvas Area</p>
          <p className="text-xs text-neutral-600">(React Three Fiber will mount here)</p>
        </div>
      </main>

      {/* 3. RIGHT BAR: Results */}
      <aside className="w-80 bg-neutral-800 border-l border-neutral-700 p-4 shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-green-400">Results</h2>
        <div className="border border-dashed border-neutral-600 h-32 rounded flex items-center justify-center text-neutral-500 text-sm">
          Awaiting generation...
        </div>
      </aside>

    </div>
  )
}

export default App