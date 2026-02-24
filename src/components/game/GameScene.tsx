import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Stars } from '@react-three/drei';
import { Vector3 } from 'three';
import { Player } from './Player';
import { Joypad } from '../ui/Joypad';
import { HarmonyMeter } from '../ui/HarmonyMeter';
import { SipOffUI } from '../ui/SipOffUI';
import { InstructionsOverlay } from '../ui/InstructionsOverlay';
import { Level1_ChaiShop } from '../../levels/Level1_ChaiShop';
import { useGameStore } from '../../state/useGameStore';

// ----- Camera Follow (must be inside Canvas) -----
const CameraFollow: React.FC = () => {
    const playerPosition = useGameStore((state) => state.playerPosition);

    useFrame((state) => {
        const target = new Vector3(
            playerPosition[0],
            playerPosition[1],
            playerPosition[2]
        );

        const desiredPos = new Vector3(
            target.x,
            target.y + 10,
            target.z + 12
        );

        // Smoothly lerp camera to desired position
        state.camera.position.lerp(desiredPos, 0.08);
        state.camera.lookAt(target);
    });

    return null;
};

// ----- Main Scene -----
export const GameScene: React.FC = () => {
    const [input, setInput] = useState({ x: 0, y: 0 });
    const tickGame = useGameStore((state) => state.tickGame);

    useEffect(() => {
        const interval = setInterval(() => tickGame(0.1), 100);
        return () => clearInterval(interval);
    }, [tickGame]);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#1a0a2e', position: 'relative' }}>
            <Canvas
                shadows
                camera={{ position: [0, 10, 12], fov: 50 }}
            >
                <CameraFollow />

                <Sky sunPosition={[100, 20, 100]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 15, 10]} castShadow intensity={1.2} />
                <pointLight position={[0, 5, -5]} intensity={1.5} color="#ffa500" />

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
