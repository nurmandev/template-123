import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const WIDTH = 1920;
const HEIGHT = 1080;

interface LavaLampProps {
  backgroundColor?: string;
  overlayOpacity?: number;
}

const Glow: React.FC<LavaLampProps> = ({
  backgroundColor = 'transparent',
  overlayOpacity = 0.7,
}) => {
  const frame = useCurrentFrame();
  const ellipses = useMemo(
    () => [{ seed: 3, baseRx: 300, baseRy: 280, color: 'rgba(230,0, 0, 0.8)' }],
    []
  );

  const opacity = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: overlayOpacity }}>
      <svg width={WIDTH} height={HEIGHT}>
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="800%"
            height="800%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="300"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            />
          </filter>
        </defs>
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={backgroundColor} />

        <g filter="url(#bbblurry-filter) ">
          {ellipses.map((ellipse, index) => (
            <ellipse
              key={index}
              rx={ellipse.baseRx}
              ry={ellipse.baseRy}
              cx={WIDTH * 0.7}
              cy={0}
              fill={ellipse.color}
              opacity={opacity}
            />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default Glow;
