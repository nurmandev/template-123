import { useMemo } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface StarDustZoomInProps {
  origin?: { x: number; y: number }; // Optional origin point for the particles
  speed?: number; // Speed multiplier for particle movement
  maxParticleSize?: number; // Maximum size of particles
}

const StarDustZoomIn: React.FC<StarDustZoomInProps> = ({
  origin,
  speed = 1, // Default speed
  maxParticleSize = 2, // Default max particle size
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Use the provided origin or default to center
  const centerX = origin?.x ?? width / 2;
  const centerY = origin?.y ?? height / 2;

  // Generate particles
  const particles = useMemo(() => {
    const count = 2000; // Number of particles
    const result = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle for direction
      const maxDistance = width; // Maximum distance a particle can travel
      const initialProgress = Math.random(); // Random progress state (0 to 1)
      result.push({
        angle,
        distance: maxDistance * initialProgress, // Initial distance based on progress
        size: Math.random() * maxParticleSize + 0.5, // Particle size based on maxParticleSize
        color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`, // Random opacity
        startFrame: Math.floor(Math.random() * durationInFrames), // Random start time
        initialProgress, // Store initial progress for position calculation
      });
    }
    return result;
  }, [durationInFrames, width, maxParticleSize]);

  return (
    <AbsoluteFill>
      {particles.map((particle, index) => {
        const particleFrame = frame - particle.startFrame;

        // Calculate dynamic position based on particle angle and distance
        const progress = interpolate(
          particleFrame,
          [0, 50 / speed],
          [particle.initialProgress, 1],
          {
            extrapolateRight: 'clamp',
          }
        );
        const distance = interpolate(progress, [0, 1], [particle.distance, particle.distance * 2], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.ease),
        });
        const x = centerX + Math.cos(particle.angle) * distance;
        const y = centerY + Math.sin(particle.angle) * distance;

        // Calculate scale and opacity for each particle
        const scale = interpolate(progress, [0, 1], [0.5, 1.5], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.ease),
        });
        const opacity = interpolate(progress, [0, 0.25, 0.75, 1], [0, 1, 1, 0], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.ease),
        });

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: '50%',
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default StarDustZoomIn;
