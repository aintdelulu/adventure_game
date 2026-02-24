import { Float, Text } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';
import { useGameStore } from '../../state/useGameStore';

interface CollectibleProps {
    type: 'leaf' | 'pearl';
    position: [number, number, number];
}

export const Collectible: React.FC<CollectibleProps> = ({ type, position }) => {
    const collectItem = useGameStore((state) => state.collectItem);
    const addXP = useGameStore((state) => state.addXP);

    const [ref, api] = useSphere(() => ({
        type: 'Static',
        position,
        args: [0.5],
        onCollide: (_e) => {
            // Logic for collection handled by collision
            // We'll hide it and trigger state change
            if (ref.current) {
                api.position.set(0, -10, 0); // Move away
                collectItem(type);
                addXP(50);
            }
        }
    }));

    const color = type === 'leaf' ? '#4caf50' : '#f4f4f4';
    const label = type === 'leaf' ? '🌿' : '⚪';

    return (
        <group ref={ref as any}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh castShadow>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                </mesh>
                <Text
                    position={[0, 0.6, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </Float>
        </group>
    );
};
