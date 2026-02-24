import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/useGameStore';

export const LandingPage: React.FC = () => {
    const setScene = useGameStore((state) => state.setScene);
    const setCharacter = useGameStore((state) => state.setCharacter);
    const selectedCharacter = useGameStore((state) => state.selectedCharacter);

    const [showRules, setShowRules] = useState(false);

    const handleStart = () => {
        if (!selectedCharacter) {
            alert("Please choose your character first!");
            return;
        }
        setScene('playing');
    };

    const rules = [
        { title: "🧭 The Goal", desc: "Embark on a solo journey to reach Level 5 and complete the Sip-Off Challenge." },
        { title: "💫 Focus", desc: "Keep your focus high by moving efficiently. High focus boosts your speed." },
        { title: "⌛ Time", desc: "Don't let your Quality Time run out! Rest at benches to recover." },
        { title: "🎒 Collect", desc: "Gather Tea Leaves and Pearls to grow and progress." }
    ];

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-creamy)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Animations */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255, 94, 98, 0.2) 0%, transparent 70%)', borderRadius: '50%' }}
            />

            <main style={{ textAlign: 'center', zIndex: 1, padding: '20px', maxWidth: '800px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 700, margin: 0 }}>Adventure Buds</h1>
                    <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.5)', marginTop: '5px' }}>Anime Edition</p>
                </motion.div>

                {/* Character Selection */}
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '20px', fontSize: '20px' }}>Choose Your Hero</h3>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        {[
                            { id: 'edgar', name: 'Edgar', type: 'Boy', color: '#4fc3f7' },
                            { id: 'kyla', name: 'Kyla', type: 'Girl', color: '#ff5e62' }
                        ].map((char) => (
                            <motion.div
                                key={char.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCharacter(char.id as any)}
                                className="glass"
                                style={{
                                    width: '160px',
                                    padding: '30px 20px',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    border: selectedCharacter === char.id ? `3px solid ${char.color}` : '1px solid rgba(255,255,255,0.3)',
                                    background: selectedCharacter === char.id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{char.id === 'edgar' ? '👦' : '👧'}</div>
                                <div style={{ fontWeight: 700, fontSize: '20px', color: 'var(--text-dark)' }}>{char.name}</div>
                                <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '5px' }}>{char.type} Character</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button
                        onClick={handleStart}
                        className="glass"
                        style={{
                            padding: '18px 60px', borderRadius: '50px',
                            background: selectedCharacter ? 'var(--bg-sunset)' : 'rgba(0,0,0,0.1)',
                            color: selectedCharacter ? 'white' : 'rgba(0,0,0,0.3)',
                            fontSize: '20px', fontWeight: 600, border: 'none', cursor: selectedCharacter ? 'pointer' : 'not-allowed',
                            boxShadow: selectedCharacter ? '0 15px 35px rgba(255, 94, 98, 0.4)' : 'none',
                        }}
                    >
                        START YOUR QUEST
                    </button>

                    <button onClick={() => setShowRules(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                        How to Play
                    </button>
                </motion.div>
            </main>

            {/* Rules Modal */}
            <AnimatePresence>
                {showRules && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass" style={{ background: '#fff', padding: '40px', borderRadius: '30px', maxWidth: '500px', width: '100%', position: 'relative' }}>
                            <button onClick={() => setShowRules(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
                            <h2 className="text-gradient" style={{ fontSize: '32px', marginBottom: '20px' }}>Tutorial</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                                {rules.map((rule, i) => (
                                    <div key={i}>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'var(--primary)' }}>{rule.title}</h3>
                                        <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>{rule.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer style={{ position: 'absolute', bottom: '30px', color: 'rgba(0,0,0,0.3)', fontSize: '12px', fontWeight: 500, letterSpacing: '1px' }}>
                DESTINY IN YOUR HANDS
            </footer>
        </div>
    );
};
