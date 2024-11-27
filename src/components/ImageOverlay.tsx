import { Img, useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig, Easing } from 'remotion';
import { WIDTH } from '../lib/consts';

interface LogoProps {
  img: string;
  showStroke?: boolean;
}

const ImageOverlay = ({ img, showStroke = false }: LogoProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Interpolate position for x and y
  const scale = interpolate(frame, [0, durationInFrames], [1.5, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const blurStrokeX = interpolate(frame, [40, durationInFrames], [WIDTH / 5, WIDTH * 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const opacity = interpolate(frame, [40, durationInFrames], [1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img
          src={img}
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </AbsoluteFill>
      {showStroke && (
        <div
          style={{
            position: 'absolute',
            top: -WIDTH / 2,
            left: blurStrokeX,
            width: WIDTH * 0.1,
            height: WIDTH * 2, // Stroke thickness
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            filter: 'blur(60px)', // Gaussian blur
            transform: `rotate(20deg)`, // Diagonal stroke
            pointerEvents: 'none',
            opacity,
          }}
        />
      )}
      <AbsoluteFill
        style={{
          background: '#161515',
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};

export default ImageOverlay;
