import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { useGameStore } from '../../state/useGameStore';

export const SafeZone: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const p1Pos = useGameStore((state) => state.player1Position);
    const p2Pos = useGameStore((state) => state.player2Position);
    const replenishQualityTime = useGameStore((state) => state.replenishQualityTime);

    const [active, setActive] = useState(false);
    const [timer, setTimer] = useState(0);

    // Box physics for the bench
    const [ref] = useBox(() => ({
        type: 'Static',
        position,
        args: [3, 1, 1],
    }));

    useFrame((_, delta) => {
        const v1 = new Vector3(...p1Pos);
        const v2 = new Vector3(...p2Pos);
        const benchPos = new Vector3(...position);

        const p1Near = v1.distanceTo(benchPos) < 2.5;
        const p2Near = v2.distanceTo(benchPos) < 2.5;

        if (p1Near && p2Near) {
            setActive(true);
            setTimer((prev) => {
                const next = prev + delta;
                if (next >= 5) {
                    replenishQualityTime(30); // Add 30 seconds
                    return 0; // Reset for next replenishment
                }
                return next;
            });
        } else {
            setActive(false);
            setTimer(0);
        }
    });

    return (
        <group ref={ref as any}>
            <mesh castShadow>
                <boxGeometry args={[3, 0.5, 1]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            {/* Bench Legs */}
            <mesh position={[-1.2, -0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 1]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>
            <mesh position={[1.2, -0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 1]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>

            {active && (
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Text
                        position={[0, 1.5, 0]}
                        fontSize={0.4}
                        color="#fff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {`Resting... ${Math.ceil(5 - timer)}s`}
                    </Text>
                </Float>
            )}

            <pointLight
                position={[0, 1, 0]}
                intensity={active ? 1 : 0}
                color="#4caf50"
                distance={3}
            />
        </group>
    );
};
