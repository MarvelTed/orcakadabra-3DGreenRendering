import { useState } from 'react';
import Header from '../components/Header';
import StartNewProject from '../components/StartNewProject';
import RecentProjects from '../components/RecentProjects';

// 1. DUMMY DATA: This simulates what you will eventually pull from Supabase
const DUMMY_PROJECTS = [
  { id: 1, title: 'Front Yard Redesign', date: 'Edited 2 hrs ago', thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Urban Rooftop Garden', date: 'Edited yesterday', thumbnail: 'https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Empty Lot Project', date: 'Edited last week', thumbnail: 'https://images.unsplash.com/photo-1595079676339-153480116657?auto=format&fit=crop&w=400&q=80' },
];

export default function MainPage() {
  const [projects, setProjects] = useState(DUMMY_PROJECTS);

  return (
    <div className="min-h-screen text-opacity-100 p-8" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <Header />
      <StartNewProject />
      <RecentProjects projects={projects} />
    </div>
  );
}