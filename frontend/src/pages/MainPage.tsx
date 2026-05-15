import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '../components/Header';
import StartNewProject from '../components/StartNewProject';
import RecentProjects from '../components/RecentProjects';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface ProjectItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80';

function formatProjectDate(dateString?: string) {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return `Updated ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
}


export default function MainPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('projects')
        .select('id, concept_name, raw_json, created_at, updated_at')
        .order('updated_at', { ascending: false })
        .limit(12);

      if (error) {
        setError(error.message);
        setProjects([]);
        setLoading(false);
        return;
      }

      const mappedProjects = (data ?? []).map((project: any) => {
        const rawJson = project.raw_json ?? {};
        const title =
          project.concept_name ||
          rawJson.project_context?.gemini_full_report?.green_solution?.concept_name ||
          'Untitled project';
        const date = formatProjectDate(project.updated_at || project.created_at);
        const thumbnail = rawJson.assets?.[0]?.thumbnail_url || DEFAULT_THUMBNAIL;

        return {
          id: project.id,
          title,
          date,
          thumbnail,
        };
      });

      setProjects(mappedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen text-opacity-100 p-8" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <Header />
      <StartNewProject />
      <RecentProjects projects={projects} />

      {loading && (
        <p className="mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Loading recent projects...
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-container)', color: 'var(--color-text-secondary)' }}>
          Failed to load recent projects: {error}
        </div>
      )}
    </div>
  );
}