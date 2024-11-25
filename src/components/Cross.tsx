import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

// Random generator with a seeded function for deterministic randomness
const random = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface CrossProps {
  delay?: number; // Delay in frames for the scale2 animation
  x?: number; // X position
  y?: number; // Y position
}

const Cross = ({ delay = 0, x = 0, y = 0 }: CrossProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intervalDuration = Math.floor(0.5 * fps); // Flicker interval

  // Continuous rotation logic
  const continuousRotation = frame * 2; // Rotate at a constant speed (2 degrees per frame)

  // Random seed based on frame
  const randomSeed = frame % intervalDuration;

  // Randomized opacity
  const flickerOpacity = random(randomSeed) * 0.7 + 0.3; // Randomized between 0.3 and 1

  // Randomized scale
  const scale = random(randomSeed + 1);

  // Scale2 animation with delay
  const scale2 = interpolate(
    frame - delay, // Apply the delay to the animation
    [0, 20, 40, 60],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale2})`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          transform: `rotate(${continuousRotation}deg) scale(${scale})`,
          opacity: flickerOpacity, // Apply randomized flickering
        }}
      >
        <svg
          width={100}
          height={100}
          viewBox="0 0 40 40"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10 L30 30 M30 10 L10 30"
            stroke={'white'}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Cross;
