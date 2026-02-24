import React from 'react';
import { useSphere } from '@react-three/cannon';
import { Float, Text } from '@react-three/drei';
import { useGameStore } from '../../state/useGameStore';

export const MiniGameTrigger: React.FC<{ position: [number, number, number]; type: 'sipOff' }> = ({ position, type }) => {
    const triggerMiniGame = useGameStore((state) => state.triggerMiniGame);

    const [ref] = useSphere(() => ({
        type: 'Static',
        position,
        args: [1.5],
        onCollide: () => {
            triggerMiniGame(type);
        }
    }));

    return (
        <group ref={ref as any}>
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.8, 1, 0.4, 32]} />
                    <meshStandardMaterial color="#feb47b" emissive="#feb47b" emissiveIntensity={0.5} />
                </mesh>
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {type === 'sipOff' ? '🥤 Start Sip-Off' : '🎮 Start Game'}
                </Text>
            </Float>
        </group>
    );
};
