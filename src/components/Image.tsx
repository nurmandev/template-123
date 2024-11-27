import { Img, useCurrentFrame, interpolate, Easing } from 'remotion';

interface LogoProps {
  img: string;
  size: number;
  start: { x: number; y: number }; // Starting position
  end: { x: number; y: number }; // Ending position
  startRotation: number; // Starting rotation angle
  delay?: number; // Delay in frames
  strokeDirection?: 'left-right' | 'right-left';
}

const Image = ({
  img,
  size,
  start,
  end,
  startRotation,
  delay = 0,
  strokeDirection = 'left-right',
}: LogoProps) => {
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

  var from, to, angle;

  switch (strokeDirection) {
    case 'left-right':
      from = size / 5;
      to = size * 0.8;
      angle = '20deg';
      break;
    case 'right-left':
      from = size * 0.8;
      to = size / 5;
      angle = '-20deg';

    default:
      from = size * 0.8;
      to = size / 5;
      angle = '-20deg';
      break;
  }
  // Gaussian blur stroke position
  const blurStrokeX = interpolate(adjustedFrame, [40, 90], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const opacity = interpolate(adjustedFrame, [40, 90], [1, 0.5], {
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
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <Img
        src={img}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Gaussian Blur Stroke */}
      <div
        style={{
          position: 'absolute',
          top: -size / 2,
          left: blurStrokeX,
          width: size * 0.1,
          height: size * 2, // Stroke thickness
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          filter: 'blur(50px)', // Gaussian blur
          transform: `rotate(${angle})`, // Diagonal stroke
          pointerEvents: 'none', // Ignore interactions
          zIndex: 10,
          opacity,
        }}
      />
    </div>
  );
};

export default Image;
