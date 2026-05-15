import data from '../../public/response_1778733474066.json';

export default function WorkshopPage() {
  const analysis = data.project_context.gemini_full_report.analysis;
  const greenSolution = data.project_context.gemini_full_report.green_solution;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {/* Left Bar (Utilities) */}
      <div className="w-64 p-4 border-r" style={{ borderColor: 'var(--color-border)' }}>
        <button className="w-full mb-4 px-4 py-2 rounded-md font-medium transition" style={{ backgroundColor: 'var(--color-brand-green)', color: 'var(--color-text-inverse)' }}>
          Upload Image
        </button>
        <button className="w-full px-4 py-2 rounded-md font-medium transition" style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-brand-green)', border: '1px solid var(--color-border)' }}>
          Upload Image using local JSON
        </button>
      </div>

      {/* Middle Screen */}
      <div className="flex-1 bg-black">
        {/* Placeholder */}
      </div>

      {/* Right Bar (Data Display) */}
      <div className="w-80 overflow-y-auto" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="p-6 space-y-6">
          {/* Section 1: Analysis */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-brand-green)' }}>Analysis</h2>
            <div className="space-y-3">
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Land size (est)</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis.land_size_est}</div>
              </div>
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Building condition</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis.building_condition}</div>
              </div>
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Structural decision</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis.structural_decision}</div>
              </div>
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Reasoning</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis.reasoning}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Green Solution */}
          <div className="space-y-4">
            <div className="space-y-0">
              <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>Green Solution</div>
              <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-brand-green)' }}>{greenSolution.concept_name}</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Description</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution.description}</div>
              </div>
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Estimated cost</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution.estimated_cost.toLocaleString()}</div>
              </div>
              <div className="space-y-0">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Waste management</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution.waste_management}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}