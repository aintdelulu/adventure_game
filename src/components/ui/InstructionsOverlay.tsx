import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstructionsOverlay: React.FC = () => {
    const [visible, setVisible] = useState(true);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(253, 245, 230, 0.4)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '20px'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="glass"
                        style={{
                            maxWidth: '500px',
                            width: '100%',
                            padding: '40px',
                            borderRadius: '40px',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.7)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h2 className="text-gradient" style={{ fontSize: '32px', marginBottom: '10px' }}>Your Quest Awaits</h2>
                        <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '30px', fontWeight: 500 }}>
                            Success isn't measured by points, but by the legacy you build together.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '15px',
                            marginBottom: '40px'
                        }}>
                            {[
                                { icon: '🤝', label: 'Stay Close', sub: 'Gain Harmony' },
                                { icon: '🌿', label: 'Gather', sub: 'Brew Chai' },
                                { icon: '⏳', label: 'Rest', sub: 'Save Time' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.5)',
                                    padding: '15px 10px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}>
                                    <div style={{ fontSize: '24px', marginBottom: '5px' }}>{item.icon}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{item.label}</div>
                                    <div style={{ fontSize: '10px', opacity: 0.5 }}>{item.sub}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            style={{
                                padding: '18px 50px',
                                borderRadius: '35px',
                                border: 'none',
                                background: 'var(--bg-sunset)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '18px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(255, 94, 98, 0.3)',
                                width: '100%'
                            }}
                        >
                            BEGIN JOURNEY
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
