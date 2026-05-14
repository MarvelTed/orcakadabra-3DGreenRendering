import '../App.css';
import UtilitiesBar from '../components/UtilitiesBar';
import Canvas3DRenderer from '../components/Canvas3DRenderer';
import ResultsBar from '../components/ResultsBar';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <UtilitiesBar />
      <Canvas3DRenderer />
      <ResultsBar />
    </div>
  )
}

export default App