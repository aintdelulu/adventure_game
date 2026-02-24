import React, { useEffect } from 'react';
import { useGameStore } from '../../state/useGameStore';

export const SipOffUI: React.FC = () => {
    const miniGameActive = useGameStore((state) => state.miniGameActive);
    const sipProgress = useGameStore((state) => state.sipProgress);
    const brainFreeze = useGameStore((state) => state.brainFreeze);
    const sip = useGameStore((state) => state.sip);
    const tickMiniGame = useGameStore((state) => state.tickMiniGame);
    const triggerMiniGame = useGameStore((state) => state.triggerMiniGame);

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

    const winner = sipProgress[0] >= 100 ? 1 : sipProgress[1] >= 100 ? 2 : null;

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
            <h2 style={{ fontSize: '32px', marginBottom: '40px', color: '#feb47b' }}>🧋 THE SIP-OFF! 🧋</h2>

            <div style={{ display: 'flex', gap: '50px', width: '100%', justifyContent: 'center' }}>
                {/* Player 1 */}
                <div style={{ textAlign: 'center' }}>
                    <h3>Player 1</h3>
                    <div style={{ height: '300px', width: '60px', background: '#333', borderRadius: '30px', position: 'relative', overflow: 'hidden', border: '3px solid #ff5e62' }}>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: `${sipProgress[0]}%`,
                            background: '#ff5e62',
                            transition: 'height 0.2s ease-out'
                        }} />
                    </div>
                    {brainFreeze[0] > 0 && <div style={{ color: '#00f2fe', fontWeight: 'bold', marginTop: '10px' }}>🧊 BRAIN FREEZE!</div>}
                    <button
                        onPointerDown={() => sip(1)}
                        style={{
                            marginTop: '20px',
                            padding: '15px 25px',
                            borderRadius: '30px',
                            border: 'none',
                            background: brainFreeze[0] > 0 ? '#666' : '#ff5e62',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        SIP!
                    </button>
                </div>

                {/* Player 2 */}
                <div style={{ textAlign: 'center' }}>
                    <h3>Player 2</h3>
                    <div style={{ height: '300px', width: '60px', background: '#333', borderRadius: '30px', position: 'relative', overflow: 'hidden', border: '3px solid #00f2fe' }}>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: `${sipProgress[1]}%`,
                            background: '#00f2fe',
                            transition: 'height 0.2s ease-out'
                        }} />
                    </div>
                    {brainFreeze[1] > 0 && <div style={{ color: '#00f2fe', fontWeight: 'bold', marginTop: '10px' }}>🧊 BRAIN FREEZE!</div>}
                    <button
                        onPointerDown={() => sip(2)}
                        style={{
                            marginTop: '20px',
                            padding: '15px 25px',
                            borderRadius: '30px',
                            border: 'none',
                            background: brainFreeze[1] > 0 ? '#666' : '#00f2fe',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        SIP!
                    </button>
                </div>
            </div>

            {winner && (
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <h1 style={{ color: '#f8b400' }}>P{winner} WINS!</h1>
                    <button
                        onClick={() => triggerMiniGame(null)}
                        style={{ padding: '10px 20px', borderRadius: '20px', background: '#fff', color: '#000', border: 'none', marginTop: '20px', fontWeight: 'bold' }}
                    >
                        CONTINUE ADVENTURE
                    </button>
                </div>
            )}

            <p style={{ marginTop: '40px', color: 'rgba(255,255,255,0.5)' }}>Tap rapidly to sip, but watch out for brain freeze!</p>
        </div>
    );
};
