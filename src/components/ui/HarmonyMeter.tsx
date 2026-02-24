import React from 'react';
import { useGameStore } from '../../state/useGameStore';

export const HarmonyMeter: React.FC = () => {
    const harmonyLevel = useGameStore((state) => state.harmonyLevel);
    const soulLinkActive = useGameStore((state) => state.soulLinkActive);
    const qualityTime = useGameStore((state) => state.qualityTime);
    const teaLeaves = useGameStore((state) => state.teaLeaves);
    const pearls = useGameStore((state) => state.pearls);
    const xp = useGameStore((state) => state.xp);
    const level = useGameStore((state) => state.level);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 100
        }}>
            <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                marginBottom: '4px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>Harmony</span>
                <span>{Math.floor(harmonyLevel)}%</span>
            </div>
            <div style={{
                height: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: soulLinkActive ? '0 0 15px #f8b400' : 'none'
            }}>
                <div style={{
                    width: `${harmonyLevel}%`,
                    height: '100%',
                    background: soulLinkActive ? 'linear-gradient(90deg, #f8b400, #fff)' : 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                    transition: 'width 0.3s ease-out, background 0.5s ease'
                }} />
            </div>

            <div style={{
                marginTop: '15px',
                background: 'rgba(0,0,0,0.4)',
                padding: '5px 15px',
                borderRadius: '20px',
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '2px solid rgba(255,255,255,0.2)'
            }}>
                <span>⏳ {formatTime(qualityTime)}</span>
                <span style={{ fontSize: '14px' }}>🌿 {teaLeaves}</span>
                <span style={{ fontSize: '14px' }}>⚪ {pearls}</span>
                <span style={{ fontSize: '14px', color: '#4fc3f7' }}>LVL {level}</span>
            </div>

            {/* XP Bar */}
            <div style={{
                marginTop: '8px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${(xp / (level * 1000)) * 100}%`,
                    height: '100%',
                    background: '#4fc3f7',
                    transition: 'width 0.5s ease-out'
                }} />
            </div>

            {soulLinkActive && (
                <div style={{
                    marginTop: '10px',
                    color: '#f8b400',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    animation: 'pulse 1s infinite'
                }}>
                    Soul Link Ready!
                </div>
            )}

            <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};
