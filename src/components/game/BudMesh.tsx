import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface BudMeshProps {
    color: string;
    input: { x: number; y: number };
}

export const BudMesh: React.FC<BudMeshProps> = ({ color, input }) => {
    const group = useRef<THREE.Group>(null);
    const head = useRef<THREE.Mesh>(null);
    const leftFoot = useRef<THREE.Mesh>(null);
    const rightFoot = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!group.current) return;

        const isMoving = Math.abs(input.x) > 0.1 || Math.abs(input.y) > 0.1;

        // General Tilt towards movement
        const targetRotationZ = -input.x * 0.2;
        const targetRotationX = input.y * 0.2;

        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotationZ, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);

        // Animation: Bobbing
        const time = state.clock.getElapsedTime();
        const bob = isMoving ? Math.sin(time * 15) * 0.05 : Math.sin(time * 2) * 0.02;
        group.current.position.y = bob;

        // Feet animation
        if (leftFoot.current && rightFoot.current) {
            const footSpeed = 15;
            const footMove = isMoving ? Math.sin(time * footSpeed) * 0.2 : 0;
            leftFoot.current.position.z = footMove;
            rightFoot.current.position.z = -footMove;

            leftFoot.current.position.y = isMoving ? Math.max(0, Math.sin(time * footSpeed) * 0.1) : 0;
            rightFoot.current.position.y = isMoving ? Math.max(0, Math.sin(time * footSpeed + Math.PI) * 0.1) : 0;
        }

        // Head tilt
        if (head.current) {
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, input.x * 0.5, 0.1);
            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -input.y * 0.3, 0.1);
        }
    });

    return (
        <group ref={group}>
            {/* Body */}
            <RoundedBox args={[0.7, 0.8, 0.6]} radius={0.15} smoothness={4} castShadow>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </RoundedBox>

            {/* Head */}
            <mesh ref={head} position={[0, 0.55, 0]} castShadow>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />

                {/* Eyes */}
                <mesh position={[0.12, 0.05, 0.25]}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
                <mesh position={[-0.12, 0.05, 0.25]}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
            </mesh>

            {/* Feet */}
            <mesh ref={leftFoot} position={[-0.2, -0.4, 0]} castShadow>
                <boxGeometry args={[0.2, 0.15, 0.3]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh ref={rightFoot} position={[0.2, -0.4, 0]} castShadow>
                <boxGeometry args={[0.2, 0.15, 0.3]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
        </group>
    );
};
