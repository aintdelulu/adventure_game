import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../state/useGameStore';

export const LandingPage: React.FC = () => {
    const setScene = useGameStore((state) => state.setScene);
    const [showRules, setShowRules] = useState(false);

    const rules = [
        { title: "🤝 Harmony", desc: "Stay close to your partner. High Harmony grants speed buffs and unlocks the 'Soul Link'." },
        { title: "⌛ Quality Time", desc: "Your time is limited. If the timer hits zero, you lose! Rest at benches to replenish it." },
        { title: "🌿 Objectives", desc: "Collect Tea Leaves and Pearls to level up and shared growth." },
        { title: "🏆 How to Win", desc: "Reach Level 5 and complete the 'Sip-Off' challenge to finish the quest." },
        { title: "❌ How to Lose", desc: "The quest ends if your Quality Time runs out or if you stray too far apart for too long." }
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
            {/* Background Decorations */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(255, 94, 98, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -45, 0],
                    x: [0, -40, 0],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '-5%',
                    right: '-5%',
                    width: '35vw',
                    height: '35vw',
                    background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}
            />

            <main style={{ textAlign: 'center', zIndex: 1, padding: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-gradient" style={{
                        fontSize: 'clamp(48px, 10vw, 84px)',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '-2px'
                    }}>
                        Adventure Buds
                    </h1>
                    <p style={{
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        color: 'rgba(0,0,0,0.6)',
                        marginTop: '10px',
                        maxWidth: '600px',
                        marginInline: 'auto'
                    }}>
                        Experience the beauty of shared growth and synchronization in a whimsically low-poly world.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                    <button
                        onClick={() => setScene('playing')}
                        className="glass"
                        style={{
                            padding: '20px 60px',
                            fontSize: '20px',
                            fontWeight: 600,
                            borderRadius: '50px',
                            background: 'var(--bg-sunset)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 15px 35px rgba(255, 94, 98, 0.4)',
                        }}
                    >
                        START YOUR QUEST
                    </button>

                    <button
                        onClick={() => setShowRules(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: 700,
                            fontSize: '16px',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        How to Play & Rules
                    </button>

                    <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
                        Best played together on a single device
                    </div>
                </motion.div>
            </main>

            <AnimatePresence>
                {showRules && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass"
                            style={{
                                background: '#fff',
                                padding: '40px',
                                borderRadius: '30px',
                                maxWidth: '600px',
                                width: '100%',
                                textAlign: 'left',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setShowRules(false)}
                                style={{
                                    position: 'absolute', top: '20px', right: '20px',
                                    background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'
                                }}
                            >✕</button>
                            <h2 className="text-gradient" style={{ fontSize: '32px', marginBottom: '20px' }}>Game Rules</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {rules.map((rule, i) => (
                                    <div key={i}>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'var(--primary)' }}>{rule.title}</h3>
                                        <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)', fontSize: '14px', lineHeight: '1.4' }}>{rule.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer style={{
                position: 'absolute',
                bottom: '30px',
                color: 'rgba(0,0,0,0.3)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '1px'
            }}>
                UNITY AGAINST THE ODDS
            </footer>
        </div>
    );
};
