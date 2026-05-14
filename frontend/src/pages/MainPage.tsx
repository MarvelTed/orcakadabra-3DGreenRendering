import { Link } from 'react-router-dom';
import { useState } from 'react';

// 1. DUMMY DATA: This simulates what you will eventually pull from Supabase
const DUMMY_PROJECTS = [
  { id: 1, title: 'Front Yard Redesign', date: 'Edited 2 hrs ago', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Urban Rooftop Garden', date: 'Edited yesterday', thumbnail: 'https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Empty Lot Project', date: 'Edited last week', thumbnail: 'https://images.unsplash.com/photo-1595079676339-153480116657?auto=format&fit=crop&w=400&q=80' },
];

export default function MainPage() {
  const [projects, setProjects] = useState(DUMMY_PROJECTS);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      
      {/* HEADER / NAVIGATION */}
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold text-green-400">GreenScape AI</h1>
        <div className="flex items-center gap-4">
          {/* Placeholder for Google Auth */}
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm transition">
            Sign In with Google
          </button>
        </div>
      </header>

      {/* START NEW PROJECT SECTION */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Start a new project</h2>
        <div className="flex gap-4">
          <Link to="/workshop" className="flex flex-col items-center justify-center w-40 h-32 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-xl transition cursor-pointer">
            <span className="text-3xl text-green-400 mb-2">+</span>
            <span className="text-sm font-medium text-green-400">Blank Canvas</span>
        </Link>
        </div>
      </section>

      {/* RECENT PROJECTS GRID */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent designs</h2>
          {/* Search Placeholder */}
          <input 
            type="text" 
            placeholder="Search your projects..." 
            className="bg-neutral-900 border border-neutral-800 text-sm rounded-md px-4 py-2 w-64 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Canva-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-neutral-800 rounded-xl overflow-hidden mb-3 border border-neutral-800 group-hover:border-green-500 transition">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              {/* Metadata */}
              <h3 className="font-medium text-neutral-200 group-hover:text-green-400 transition">{project.title}</h3>
              <p className="text-xs text-neutral-500">{project.date}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}