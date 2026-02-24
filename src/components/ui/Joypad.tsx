import React, { useRef, useState } from 'react';

interface JoypadProps {
    onMove: (dir: { x: number; y: number }) => void;
    color?: string;
    side: 'left' | 'right';
    label?: string;
}

export const Joypad: React.FC<JoypadProps> = ({ onMove, color = '#f8b400', side, label }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handlePointerMove = (e: React.PointerEvent | PointerEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = rect.width / 2;

        const limitedDistance = Math.min(distance, maxRadius);
        const angle = Math.atan2(dy, dx);

        const nx = Math.cos(angle) * (limitedDistance / maxRadius);
        const ny = Math.sin(angle) * (limitedDistance / maxRadius);

        setPosition({ x: Math.cos(angle) * limitedDistance, y: Math.sin(angle) * limitedDistance });
        onMove({ x: nx, y: -ny }); // Standardize y for 3D world (forward is -z or +z depending on cam)
    };

    const handlePointerUp = () => {
        isDragging.current = false;
        setPosition({ x: 0, y: 0 });
        onMove({ x: 0, y: 0 });
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    const handlePointerDown = () => {
        isDragging.current = true;
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '40px',
                [side]: '40px',
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                touchAction: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
            ref={containerRef}
            onPointerDown={handlePointerDown}
        >
            {label && <span style={{ position: 'absolute', top: '-30px', color: '#fff', fontSize: '12px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{label}</span>}
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    background: `radial-gradient(circle at 30% 30%, ${color}, #000)`,
                    borderRadius: '50%',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
                    boxShadow: isDragging.current
                        ? `0 0 30px ${color}, inset 0 0 10px rgba(255,255,255,0.5)`
                        : `0 0 15px ${color}, inset 0 0 5px rgba(255,255,255,0.3)`,
                    border: '1px solid rgba(255,255,255,0.4)',
                }}
            />
        </div>
    );
};
