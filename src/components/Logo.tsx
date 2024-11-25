import { Img, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface LogoProps {
  logo: string;
  size: number;
  x?: number;
  y?: number;
  delay?: number;
}

const Logo = ({ logo, size, x = 0, y = 0, delay = 0 }: LogoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  return (
    <Img
      src={logo}
      style={{
        width: 'auto',
        height: size,
        left: x - size * 0.7,
        top: y - size / 2,
        position: 'absolute',
        zIndex: 1,
        transform: `scale(${scale})`,
      }}
    />
  );
};

export default Logo;
