import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Stars, PerspectiveCamera } from '@react-three/drei';
import { Player } from './Player';
import { Joypad } from '../ui/Joypad';
import { HarmonyMeter } from '../ui/HarmonyMeter';
import { SipOffUI } from '../ui/SipOffUI';
import { InstructionsOverlay } from '../ui/InstructionsOverlay';
import { Level1_ChaiShop } from '../../levels/Level1_ChaiShop';
import { useGameStore } from '../../state/useGameStore';

export const GameScene: React.FC = () => {
    const [input, setInput] = useState({ x: 0, y: 0 });
    const playerPosition = useGameStore((state) => state.playerPosition);
    const tickGame = useGameStore((state) => state.tickGame);

    // Camera target
    const cameraTarget = [playerPosition[0], playerPosition[1] + 2, playerPosition[2]];

    useEffect(() => {
        const interval = setInterval(() => tickGame(0.1), 100);
        return () => clearInterval(interval);
    }, [tickGame]);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
            <Canvas shadows>
                <PerspectiveCamera
                    makeDefault
                    position={[cameraTarget[0], cameraTarget[1] + 10, cameraTarget[2] + 10]}
                    fov={50}
                />
                <Sky sunPosition={[100, 20, 100]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow intensity={1} />

                <Physics gravity={[0, -9.81, 0]}>
                    <Player input={input} />
                    <Level1_ChaiShop />
                </Physics>
            </Canvas>

            {/* UI Layer */}
            <HarmonyMeter />
            <SipOffUI />
            <InstructionsOverlay />

            <Joypad
                side="center"
                color="var(--primary)"
                onMove={(dir) => setInput(dir)}
            />
        </div>
    );
};
