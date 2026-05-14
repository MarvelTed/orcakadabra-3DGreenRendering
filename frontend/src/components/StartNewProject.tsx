import { Link } from 'react-router-dom';

export default function StartNewProject() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-brand-green)' }}>
        Start a new project
      </h2>
      <div className="flex gap-4">
        <Link
          to="/workshop"
          className="flex flex-col items-center justify-center w-40 h-32 rounded-xl transition cursor-pointer"
          style={{
            backgroundColor: 'var(--color-background-secondary)',
            border: '2px solid var(--color-brand-green-light)',
            color: 'var(--color-brand-green)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-background-tertiary)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)')
          }
        >
          <span className="text-3xl mb-2" style={{ color: 'var(--color-brand-green)' }}>
            +
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-brand-green)' }}>
            Blank Canvas
          </span>
        </Link>
      </div>
    </section>
  );
}
