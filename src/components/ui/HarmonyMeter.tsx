import React from 'react';
import { useGameStore } from '../../state/useGameStore';

export const HarmonyMeter: React.FC = () => {
    const harmonyLevel = useGameStore((state) => state.harmonyLevel);
    const soulLinkActive = useGameStore((state) => state.soulLinkActive);
    const qualityTime = useGameStore((state) => state.qualityTime);
    const xp = useGameStore((state) => state.xp);
    const level = useGameStore((state) => state.level);
    const teaLeaves = useGameStore((state) => state.teaLeaves);
    const pearls = useGameStore((state) => state.pearls);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(90vw, 400px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 100,
            pointerEvents: 'none',
        }}>
            {/* Harmony Bar Container */}
            <div className="glass" style={{
                width: '100%',
                height: '14px',
                borderRadius: '7px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: `0 0 20px rgba(255, 94, 98, ${harmonyLevel / 100})`
            }}>
                <div style={{
                    width: `${harmonyLevel}%`,
                    height: '100%',
                    background: 'var(--bg-sunset)',
                    transition: 'width 0.3s ease-out',
                    boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
                    position: 'relative'
                }}>
                    {/* Pulse effect when high harmony */}
                    {harmonyLevel > 80 && (
                        <div style={{
                            position: 'absolute',
                            top: 0, right: 0, bottom: 0, left: 0,
                            background: 'white',
                            opacity: 0.3,
                            animation: 'pulse 1.5s infinite'
                        }} />
                    )}
                </div>
            </div>

            <div style={{
                marginTop: '12px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 5px'
            }}>
                <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    Harmony {Math.round(harmonyLevel)}%
                </span>
            </div>

            {/* Resources & Status Glass Panel */}
            <div className="glass" style={{
                marginTop: '15px',
                padding: '10px 20px',
                borderRadius: '30px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'var(--text-dark)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>⏳</span>
                    <span style={{ fontSize: '16px', fontWeight: 600 }}>{formatTime(qualityTime)}</span>
                </div>
                <div style={{ width: '1px', height: '15px', background: 'rgba(0,0,0,0.1)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span title="Tea Leaves">🌿 <strong>{teaLeaves}</strong></span>
                    <span title="Pearls">⚪ <strong>{pearls}</strong></span>
                </div>
                <div style={{ width: '1px', height: '15px', background: 'rgba(0,0,0,0.1)' }} />
                <div style={{
                    background: 'rgba(79, 195, 247, 0.2)',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#0288d1'
                }}>
                    LVL {level}
                </div>
            </div>

            {/* XP Bar Overlay */}
            <div style={{
                marginTop: '10px',
                width: '150px',
                height: '4px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <div style={{
                    width: `${(xp / (level * 1000)) * 100}%`,
                    height: '100%',
                    background: '#4fc3f7',
                    transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }} />
            </div>

            {soulLinkActive && (
                <div
                    style={{
                        marginTop: '15px',
                        padding: '8px 25px',
                        background: 'var(--bg-sunset)',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '20px',
                        fontSize: '14px',
                        boxShadow: '0 0 20px rgba(255, 94, 98, 0.6)',
                        animation: 'bounce 1s infinite'
                    }}
                >
                    ✨ SOUL LINK ACTIVE ✨
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 0.1; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
};
