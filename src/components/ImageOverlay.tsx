import { Img, useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from 'remotion';

interface LogoProps {
  img: string;
}

const ImageOverlay = ({ img }: LogoProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Interpolate position for x and y
  const scale = interpolate(frame, [0, durationInFrames], [1.5, 2], {
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
