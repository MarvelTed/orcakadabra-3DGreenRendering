import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useProject } from '../hooks/useProject';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Scene, SceneErrorBoundary } from '../components/workshop/Scene3D';
import WorkshopLeftBar from '../components/workshop/WorkshopLeftBar';
import WorkshopRightBar from '../components/workshop/WorkshopRightBar';
import HeaderWorkshopPage from '../components/HeaderWorkshopPage';

export default function WorkshopPage() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const { projectData, loading, error } = useProject(projectId);

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
        <div className="flex-1"><ErrorMessage message={error} centered={true} /></div>
        <div className="w-80"></div>
      </div>
    );
  }

  const analysis = projectData?.raw_json?.project_context?.gemini_full_report?.analysis;
  const greenSolution = projectData?.raw_json?.project_context?.gemini_full_report?.green_solution;
  const assets = projectData?.raw_json?.assets || [];

  return (
    <div>
      <HeaderWorkshopPage />
      <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
        <WorkshopLeftBar />

        {/* Middle Screen (3D Renderer) */}
        <div className="flex-1 bg-black">
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas
              camera={{ position: [5, 5, 5], fov: 75 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (event) => {
                  event.preventDefault();
                });
              }}
            >
              <SceneErrorBoundary>
                <Scene assets={assets} />
              </SceneErrorBoundary>
            </Canvas>
          </Suspense>
        </div>

        <WorkshopRightBar
          analysis={analysis}
          greenSolution={greenSolution}
          projectConcept={projectData?.concept_name}
          projectCost={projectData?.estimated_cost}
        />
      </div>
    </div>
  );
}