import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface WorldLabelProps {
    text: string;
    position: [number, number, number];
    color?: string;
}

export const WorldLabel: React.FC<WorldLabelProps> = ({ text, position, color = "#ff5e62" }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;

        // Face the camera
        ref.current.quaternion.copy(state.camera.quaternion);

        // Gentle float
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    });

    return (
        <group ref={ref} position={position}>
            <Text
                fontSize={0.4}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/outfit/v11/QGYvz_kZ_D4_7XfQhS_v6Hux6UM.woff"
            >
                {text}
                <meshStandardMaterial attach="material" emissive={color} emissiveIntensity={0.5} />
            </Text>

            {/* Background Glow */}
            <mesh scale={[text.length * 0.2, 0.6, 0.1]} position={[0, 0, -0.05]}>
                <planeGeometry />
                <meshBasicMaterial color="#fff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
};
