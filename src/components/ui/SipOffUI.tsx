import React, { useEffect } from 'react';
import { useGameStore } from '../../state/useGameStore';

export const SipOffUI: React.FC = () => {
    const miniGameActive = useGameStore((state) => state.miniGameActive);
    const sipProgress = useGameStore((state) => state.sipProgress);
    const brainFreeze = useGameStore((state) => state.brainFreeze);
    const sip = useGameStore((state) => state.sip);
    const tickMiniGame = useGameStore((state) => state.tickMiniGame);
    const triggerMiniGame = useGameStore((state) => state.triggerMiniGame);
    const selectedCharacter = useGameStore((state) => state.selectedCharacter);

    useEffect(() => {
        let interval: any;
        if (miniGameActive === 'sipOff') {
            interval = setInterval(() => {
                tickMiniGame(0.1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [miniGameActive, tickMiniGame]);

    if (miniGameActive !== 'sipOff') return null;

    const isFinished = sipProgress >= 100;
    const name = selectedCharacter === 'edgar' ? 'Edgar' : 'Kyla';

    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            color: '#fff',
            padding: '20px'
        }}>
            <h2 style={{ fontSize: '32px', marginBottom: '40px', color: '#feb47b' }}>🧋 THE SOLO SIP-OFF! 🧋</h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>{name}</h3>
                <div style={{ height: '300px', width: '80px', background: '#333', borderRadius: '40px', position: 'relative', overflow: 'hidden', border: '4px solid var(--primary)' }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: `${sipProgress}%`,
                        background: 'var(--bg-sunset)',
                        transition: 'height 0.2s ease-out'
                    }} />
                </div>

                {brainFreeze > 0 && (
                    <div style={{ color: '#4fc3f7', fontStyle: 'italic', fontWeight: 'bold', marginTop: '10px', fontSize: '20px' }}>
                        🧊 BRAIN FREEZE! 🧊
                    </div>
                )}

                <button
                    onPointerDown={() => sip()}
                    style={{
                        marginTop: '30px',
                        padding: '20px 50px',
                        borderRadius: '40px',
                        border: 'none',
                        background: brainFreeze > 0 ? '#666' : 'var(--bg-sunset)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                        cursor: brainFreeze > 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    SIP!
                </button>
            </div>

            {isFinished && (
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <h1 style={{ color: '#4fc3f7' }}>CHALLENGE COMPLETE!</h1>
                    <button
                        onClick={() => triggerMiniGame(null)}
                        style={{ padding: '15px 40px', borderRadius: '30px', background: '#fff', color: '#000', border: 'none', marginTop: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        CONTINUE ADVENTURE
                    </button>
                </div>
            )}

            <p style={{ marginTop: '40px', color: 'rgba(255,255,255,0.5)', maxWidth: '400px', textAlign: 'center' }}>
                Tap rapidly to drink your chai! Watch your pulse. Too fast and you'll get a brain freeze!
            </p>
        </div>
    );
};
