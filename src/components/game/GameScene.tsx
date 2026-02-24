import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Environment, ContactShadows } from '@react-three/drei';
import { Player } from './Player';
import { HarmonyEngine } from '../../engine/HarmonyEngine';
import { Joypad } from '../ui/Joypad';
import { HarmonyMeter } from '../ui/HarmonyMeter';
import { Level1_ChaiShop } from '../../levels/Level1_ChaiShop';
import { ComplimentEffect } from './ComplimentEffect';
import { useGameStore } from '../../state/useGameStore';
import { SipOffUI } from '../ui/SipOffUI';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

const CameraController = () => {
    const p1 = useGameStore((state) => state.player1Position);
    const p2 = useGameStore((state) => state.player2Position);

    useFrame((state) => {
        const midPoint = new Vector3(
            (p1[0] + p2[0]) / 2,
            (p1[1] + p2[1]) / 2,
            (p1[2] + p2[2]) / 2
        );

        const targetCameraPos = new Vector3(
            midPoint.x,
            midPoint.y + 12, // Height
            midPoint.z + 15  // Distance
        );

        state.camera.position.lerp(targetCameraPos, 0.1);
        state.camera.lookAt(midPoint);
    });

    return null;
};

export const GameScene: React.FC = () => {
    const [p1Input, setP1Input] = useState({ x: 0, y: 0 });
    const [p2Input, setP2Input] = useState({ x: 0, y: 0 });
    const setComplimenting = useGameStore((state) => state.setComplimenting);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#fdf5e6' }}>
            <Canvas shadows camera={{ position: [0, 10, 15], fov: 45 }}>
                <CameraController />
                <Sky sunPosition={[100, 20, 100]} />

                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />

                <Physics gravity={[0, -9.81, 0]}>
                    <Level1_ChaiShop />
                    <Player
                        id={1}
                        color="#ff5e62"
                        initialPosition={[-2, 1, 0]}
                        input={p1Input}
                    />
                    <Player
                        id={2}
                        color="#00f2fe"
                        initialPosition={[2, 1, 0]}
                        input={p2Input}
                    />
                    <HarmonyEngine />
                    <ComplimentEffect />
                </Physics>

                <ContactShadows
                    opacity={0.4}
                    scale={20}
                    blur={2.4}
                    far={10}
                    resolution={256}
                    color="#000000"
                />
            </Canvas>

            <HarmonyMeter />
            <SipOffUI />

            {/* Local Co-op Controls */}
            <Joypad
                side="left"
                label="Player 1"
                color="#ff5e62"
                onMove={setP1Input}
            />
            <Joypad
                side="right"
                label="Player 2"
                color="#00f2fe"
                onMove={setP2Input}
            />

            {/* Compliment Buttons */}
            <button
                onPointerDown={() => setComplimenting(1, true)}
                onPointerUp={() => setComplimenting(1, false)}
                style={{
                    position: 'absolute',
                    bottom: '180px',
                    left: '50px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 94, 98, 0.8)',
                    color: 'white',
                    fontSize: '24px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    touchAction: 'none'
                }}
            >
                ❤️
            </button>

            <button
                onPointerDown={() => setComplimenting(2, true)}
                onPointerUp={() => setComplimenting(2, false)}
                style={{
                    position: 'absolute',
                    bottom: '180px',
                    right: '50px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(0, 242, 254, 0.8)',
                    color: 'white',
                    fontSize: '24px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    touchAction: 'none'
                }}
            >
                ❤️
            </button>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(0,0,0,0.5)',
                fontSize: '12px',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                STAY CLOSE TO GAIN HARMONY
            </div>
        </div>
    );
};
