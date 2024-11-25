import { Img, useCurrentFrame, interpolate } from 'remotion';

interface LogoProps {
  img: string;
  size: number;
  start: { x: number; y: number }; // Starting position
  end: { x: number; y: number }; // Ending position
  startRotation: number; // Starting rotation angle
  delay?: number; // Delay in frames
}

const Image = ({ img, size, start, end, startRotation, delay = 0 }: LogoProps) => {
  const frame = useCurrentFrame();

  // Adjust frame with delay
  const adjustedFrame = Math.max(0, frame - delay);

  // Interpolate position for x and y
  const xPosition = interpolate(adjustedFrame, [0, 40], [start.x, end.x], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yPosition = interpolate(adjustedFrame, [0, 40], [start.y, end.y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Interpolate rotation
  const rotation = interpolate(adjustedFrame, [0, 40], [startRotation, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        transform: `translate(${xPosition}px, ${yPosition}px) rotate(${rotation}deg)`,
        transformOrigin: 'center',
        background: 'white',
        padding: 50,
      }}
    >
      <Img
        src={img}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default Image;
