import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../state/useGameStore';

export const LandingPage: React.FC = () => {
    const setScene = useGameStore((state) => state.setScene);

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
                    style={{ marginTop: '50px' }}
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
                            transform: 'translateY(0)',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 20px 45px rgba(255, 94, 98, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 94, 98, 0.4)';
                        }}
                    >
                        START YOUR QUEST
                    </button>

                    <div style={{ marginTop: '20px', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
                        Best played together on a single device
                    </div>
                </motion.div>
            </main>

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
