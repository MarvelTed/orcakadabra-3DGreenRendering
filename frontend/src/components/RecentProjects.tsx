import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--color-brand-green)' }}>
          Recent designs
        </h2>
        {/* Search Placeholder */}
        <input
          type="text"
          placeholder="Search your projects..."
          className="text-sm rounded-md px-4 py-2 w-64 focus:outline-none transition"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-green)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Canva-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            date={project.date}
            thumbnail={project.thumbnail}
          />
        ))}
      </div>
    </section>
  );
}
