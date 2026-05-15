import NewProjectCard from "./NewProjectCard";

export default function StartNewProject() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-brand-green)' }}>
        Start a new project
      </h2>
      <div className="flex justify gap-4">
        <NewProjectCard
          title = "Blank Space"
        />
        <NewProjectCard
          title = "Rumah Alvin"
        />
        <NewProjectCard
          title = "Rumah Budhi"
        />
        <NewProjectCard
          title = "Rumah Raymond"
        />
      </div>
    </section>
  );
}
