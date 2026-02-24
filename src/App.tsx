import { AnimatePresence, motion } from 'framer-motion';
import { GameScene } from './components/game/GameScene';
import { LandingPage } from './components/ui/LandingPage';
import { useGameStore } from './state/useGameStore';
import './App.css';

function App() {
  const scene = useGameStore((state) => state.scene);

  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {scene === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            <GameScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
