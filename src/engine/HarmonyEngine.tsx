import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '../state/useGameStore';

export const HarmonyEngine: React.FC = () => {
    const p1Pos = useGameStore((state) => state.player1Position);
    const p2Pos = useGameStore((state) => state.player2Position);
    const updateHarmony = useGameStore((state) => state.updateHarmony);
    const tickQualityTime = useGameStore((state) => state.tickQualityTime);

    useFrame((_, delta) => {
        // Calculate distance between players
        const v1 = new Vector3(...p1Pos);
        const v2 = new Vector3(...p2Pos);
        const distance = v1.distanceTo(v2);

        // Update harmony based on distance
        updateHarmony(distance);

        // Decrease quality time unless in a safe zone (can be handled here or elsewhere)
        tickQualityTime(delta);
    });

    return null;
};
