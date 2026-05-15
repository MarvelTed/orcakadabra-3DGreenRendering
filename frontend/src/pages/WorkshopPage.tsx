import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Custom 3D Model Component
function Model({ url, position }: { url: string; position: [number, number, number] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} />;
}

// 3D Scene Component
function Scene({ assets }: { assets: any[] }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={true} />
      {assets.map((asset, index) => {
        const coords = asset.spatial_data?.spatial_3d_coordinates;
        if (!coords) return null;
        return (
          <Model
            key={index}
            url={asset.model_url}
            position={[coords.X_meter, coords.Y_meter, coords.Z_meter]}
          />
        );
      })}
    </>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--color-brand-green)' }}></div>
    </div>
  );
}

// Error Component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="text-center">
        <div className="text-red-500 text-lg font-medium mb-2">Error</div>
        <div style={{ color: 'var(--color-text-secondary)' }}>{message}</div>
      </div>
    </div>
  );
}

export default function WorkshopPage() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');

  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError('No project ID provided');
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error) throw error;

        setProjectData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="w-64 p-4 border-r" style={{ borderColor: 'var(--color-border)' }}></div>
        <div className="flex-1"><LoadingSpinner /></div>
        <div className="w-80"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="w-64 p-4 border-r" style={{ borderColor: 'var(--color-border)' }}></div>
        <div className="flex-1"><ErrorMessage message={error} /></div>
        <div className="w-80"></div>
      </div>
    );
  }

  const analysis = projectData?.raw_json?.project_context?.gemini_full_report?.analysis;
  const greenSolution = projectData?.raw_json?.project_context?.gemini_full_report?.green_solution;
  const assets = projectData?.raw_json?.assets || [];

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

      {/* Middle Screen (3D Renderer) */}
      <div className="flex-1 bg-black">
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
            <Scene assets={assets} />
          </Canvas>
        </Suspense>
      </div>

      {/* Right Bar (Metadata Display) */}
      <div className="w-80 overflow-y-auto" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="p-6 space-y-6">
          {/* Section 1: Analysis */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-brand-green)' }}>Analysis</h2>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Land size (est)</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis?.land_size_est}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Building condition</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis?.building_condition}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Structural decision</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis?.structural_decision}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Reasoning</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{analysis?.reasoning}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Green Solution */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Green Solution</div>
              <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-brand-green)' }}>{greenSolution?.concept_name || projectData?.concept_name}</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Description</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution?.description}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Estimated cost</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution?.estimated_cost?.toLocaleString() || projectData?.estimated_cost?.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-brand-green-light)' }}>Waste management</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{greenSolution?.waste_management}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}