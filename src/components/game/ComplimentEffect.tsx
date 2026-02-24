import { Text, Float } from '@react-three/drei';
import { useGameStore } from '../../state/useGameStore';
import { Vector3 } from 'three';

export const ComplimentEffect: React.FC = () => {
    const comboActive = useGameStore((state) => state.comboActive);
    const p1Pos = useGameStore((state) => state.player1Position);
    const p2Pos = useGameStore((state) => state.player2Position);

    const midPoint = new Vector3(
        (p1Pos[0] + p2Pos[0]) / 2,
        (p1Pos[1] + p2Pos[1]) / 2 + 1,
        (p1Pos[2] + p2Pos[2]) / 2
    );

    if (!comboActive) return null;

    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <group position={midPoint}>
                <Text
                    fontSize={3}
                    color="#ff1493"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.1}
                    outlineColor="#fff"
                >
                    ❤️
                </Text>
                <pointLight intensity={5} distance={10} color="#ff1493" />
            </group>
        </Float>
    );
};
