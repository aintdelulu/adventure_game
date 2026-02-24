import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface AnimeMeshProps {
    type: 'edgar' | 'kyla';
    input: { x: number; y: number };
}

export const AnimeMesh: React.FC<AnimeMeshProps> = ({ type, input }) => {
    const group = useRef<THREE.Group>(null);
    const head = useRef<THREE.Mesh>(null);
    const leftFoot = useRef<THREE.Mesh>(null);
    const rightFoot = useRef<THREE.Mesh>(null);

    const isBoy = type === 'edgar';
    const mainColor = isBoy ? '#4fc3f7' : '#ff5e62';

    useFrame((state) => {
        if (!group.current) return;

        const isMoving = Math.abs(input.x) > 0.1 || Math.abs(input.y) > 0.1;
        const time = state.clock.getElapsedTime();

        // General Tilt towards movement
        const targetRotationZ = -input.x * 0.2;
        const targetRotationX = input.y * 0.2;
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotationZ, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);

        // Bobbing
        const bob = isMoving ? Math.sin(time * 15) * 0.05 : Math.sin(time * 2) * 0.02;
        group.current.position.y = bob;

        // Feet logic
        if (leftFoot.current && rightFoot.current) {
            const footSpeed = 15;
            const footMove = isMoving ? Math.sin(time * footSpeed) * 0.2 : 0;
            leftFoot.current.position.z = footMove;
            rightFoot.current.position.z = -footMove;
            leftFoot.current.position.y = isMoving ? Math.max(0, Math.sin(time * footSpeed) * 0.1) : 0;
            rightFoot.current.position.y = isMoving ? Math.max(0, Math.sin(time * footSpeed + Math.PI) * 0.1) : 0;
        }

        // Head tilt logic
        if (head.current) {
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, input.x * 0.4, 0.1);
        }
    });

    return (
        <group ref={group}>
            {/* Body */}
            {isBoy ? (
                // Edgar's Body (T-shirt + Pants feel)
                <group>
                    <RoundedBox args={[0.6, 0.7, 0.4]} radius={0.1} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#fff" /> {/* T-shirt */}
                    </RoundedBox>
                    <RoundedBox args={[0.62, 0.4, 0.42]} radius={0.05} position={[0, -0.3, 0]}>
                        <meshStandardMaterial color="#2c3e50" /> {/* Pants */}
                    </RoundedBox>
                </group>
            ) : (
                // Kyla's Body (Dress/Skirt feel)
                <group>
                    <RoundedBox args={[0.55, 0.6, 0.4]} radius={0.1} position={[0, 0.1, 0]}>
                        <meshStandardMaterial color="#fff" /> {/* Top */}
                    </RoundedBox>
                    <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.4, 0.6, 16]} />
                        <meshStandardMaterial color={mainColor} /> {/* Skirt */}
                    </mesh>
                </group>
            )}

            {/* Head */}
            <mesh ref={head} position={[0, 0.6, 0]}>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshStandardMaterial color="#ffe0bd" />

                {/* Hair - Very simple anime style */}
                <group position={[0, 0.1, 0]}>
                    {isBoy ? (
                        // Boy Hair
                        <mesh position={[0, 0.2, 0]}>
                            <sphereGeometry args={[0.36, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#34495e" />
                        </mesh>
                    ) : (
                        // Girl Hair (longer)
                        <group>
                            <mesh position={[0, 0.2, 0]}>
                                <sphereGeometry args={[0.37, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                <meshStandardMaterial color="#e67e22" />
                            </mesh>
                            <mesh position={[0.3, -0.1, -0.1]}>
                                <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                                <meshStandardMaterial color="#e67e22" />
                            </mesh>
                            <mesh position={[-0.3, -0.1, -0.1]}>
                                <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                                <meshStandardMaterial color="#e67e22" />
                            </mesh>
                        </group>
                    )}
                </group>

                {/* Anime Eyes */}
                <group position={[0, 0, 0.32]}>
                    <mesh position={[0.12, 0, 0]}>
                        <planeGeometry args={[0.12, 0.18]} />
                        <meshBasicMaterial color="#000" transparent opacity={0.9} />
                    </mesh>
                    <mesh position={[-0.12, 0, 0]}>
                        <planeGeometry args={[0.12, 0.18]} />
                        <meshBasicMaterial color="#000" transparent opacity={0.9} />
                    </mesh>
                    {/* Eye Sparkle */}
                    <mesh position={[0.14, 0.04, 0.01]}>
                        <circleGeometry args={[0.03, 16]} />
                        <meshBasicMaterial color="#fff" />
                    </mesh>
                    <mesh position={[-0.1, 0.04, 0.01]}>
                        <circleGeometry args={[0.03, 16]} />
                        <meshBasicMaterial color="#fff" />
                    </mesh>
                </group>
            </mesh>

            {/* Feet */}
            <mesh ref={leftFoot} position={[-0.2, -0.45, 0]}>
                <boxGeometry args={[0.18, 0.12, 0.25]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh ref={rightFoot} position={[0.2, -0.45, 0]}>
                <boxGeometry args={[0.18, 0.12, 0.25]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    );
};
