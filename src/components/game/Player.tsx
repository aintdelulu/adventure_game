import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3, Mesh } from 'three';
import { useGameStore } from '../../state/useGameStore';

interface PlayerProps {
    id: 1 | 2;
    color: string;
    initialPosition: [number, number, number];
    input: { x: number; y: number };
}

export const Player: React.FC<PlayerProps> = ({ id, color, initialPosition, input }) => {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: initialPosition,
        args: [0.5], // Sphere radius
        fixedRotation: true,
    }));

    const updatePosition = useGameStore((state) => state.updatePlayerPosition);
    const harmonyLevel = useGameStore((state) => state.harmonyLevel);
    const velocity = useRef([0, 0, 0]);

    useEffect(() => {
        const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
        return unsubscribe;
    }, [api.velocity]);

    useFrame(() => {
        // Buff from harmony: speed increase
        const speedBuff = 1 + (harmonyLevel / 100) * 0.5; // Up to 50% faster
        const baseSpeed = 5;
        const speed = baseSpeed * speedBuff;

        // Apply force based on input
        api.velocity.set(input.x * speed, velocity.current[1], -input.y * speed);

        // Sync position to global state for distance calculation
        if (ref.current) {
            const worldPos = new Vector3();
            ref.current.getWorldPosition(worldPos);
            updatePosition(id, [worldPos.x, worldPos.y, worldPos.z]);
        }
    });

    return (
        <mesh ref={ref as React.Ref<Mesh>} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />

            {/* Soul Link Glow */}
            {harmonyLevel > 80 && (
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.3} />
                </mesh>
            )}
        </mesh>
    );
};
