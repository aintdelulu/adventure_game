import React from 'react';
import { useBox } from '@react-three/cannon';
import { Collectible } from '../components/game/Collectible';
import { SafeZone } from '../components/game/SafeZone';
import { MiniGameTrigger } from '../components/game/MiniGameTrigger';

const Desk = ({ position, args }: { position: [number, number, number], args: [number, number, number] }) => {
    const [ref] = useBox(() => ({ type: 'Static', position, args }));
    return (
        <mesh ref={ref as any} castShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color="#8b4513" />
        </mesh>
    );
};

export const Level1_ChaiShop: React.FC = () => {
    return (
        <>
            <ambientLight intensity={0.5} />

            {/* Tea Shop Walls/Floor Details */}
            <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#f5deb3" />
            </mesh>

            {/* Low-poly Furniture */}
            <Desk position={[-5, 0.5, -5]} args={[2, 1, 1]} />
            <Desk position={[5, 0.5, -5]} args={[2, 1, 1]} />
            <Desk position={[0, 0.5, -8]} args={[4, 1, 0.5]} /> {/* Counter */}

            {/* Collectibles */}
            <Collectible type="leaf" position={[-3, 1, -4]} />
            <Collectible type="leaf" position={[3, 1, -4]} />
            <Collectible type="pearl" position={[0, 1, -6]} />
            <Collectible type="pearl" position={[-4, 1, -2]} />
            <Collectible type="leaf" position={[4, 1, -2]} />

            {/* Safe Zones */}
            <SafeZone position={[0, 0.5, 2]} />

            {/* Mini-Games */}
            <MiniGameTrigger type="sipOff" position={[0, 0.5, -8]} />


            {/* Warm Cozy Lighting */}
            <pointLight position={[0, 5, -5]} intensity={1.5} color="#ffa500" castShadow />

            {/* Background Ambience */}
            <fog attach="fog" args={['#fdf5e6', 5, 30]} />
        </>
    );
};
