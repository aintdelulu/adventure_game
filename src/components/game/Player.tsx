import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { useGameStore } from '../../state/useGameStore';
import { AnimeMesh } from './AnimeMesh';

interface PlayerProps {
    input: { x: number; y: number };
}

export const Player: React.FC<PlayerProps> = ({ input }) => {
    const selectedCharacter = useGameStore((state) => state.selectedCharacter);
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: [0, 1, 0],
        args: [0.5],
        fixedRotation: true,
    }));

    const updatePosition = useGameStore((state) => state.updatePlayerPosition);
    const focusLevel = useGameStore((state) => state.focusLevel);
    const velocity = useRef([0, 0, 0]);

    useEffect(() => {
        const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
        return unsubscribe;
    }, [api.velocity]);

    useFrame(() => {
        const speedBuff = 1 + (focusLevel / 100) * 0.5;
        const baseSpeed = 6; // Slightly faster for single player
        const speed = baseSpeed * speedBuff;

        api.velocity.set(input.x * speed, velocity.current[1], -input.y * speed);

        if (ref.current) {
            const worldPos = new Vector3();
            ref.current.getWorldPosition(worldPos);
            updatePosition([worldPos.x, worldPos.y, worldPos.z]);
        }
    });

    if (!selectedCharacter) return null;

    const displayName = selectedCharacter === 'edgar' ? 'Edgar' : 'Kyla';

    return (
        <group ref={ref as any}>
            <AnimeMesh type={selectedCharacter} input={input} />

            {/* Name Label */}
            <Text
                position={[0, 1.2, 0]}
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/outfit/v11/QGYvz_kZ_D4_7XfQhS_v6Hux6UM.woff"
            >
                {displayName}
                <meshStandardMaterial attach="material" emissive="white" emissiveIntensity={0.5} />
            </Text>

            {/* Focus Burst Effect */}
            {focusLevel > 90 && (
                <mesh scale={[1.4, 1.4, 1.4]} position={[0, 0.2, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color={selectedCharacter === 'edgar' ? '#4fc3f7' : '#ff5e62'} transparent opacity={0.2} />
                </mesh>
            )}
        </group>
    );
};
