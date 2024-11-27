import type { TransitionPresentationComponentProps } from '@remotion/transitions';
import type { TransitionPresentation } from '@remotion/transitions';
import React, { useMemo } from 'react';
import { AbsoluteFill, Easing, interpolate } from 'remotion';
import { HEIGHT, WIDTH } from '../lib/consts';

export type CustomShapeChangeProps = {
  direction?: 'bottom-right' | 'bottom-left' | 'top';
};

const SlidePresentation: React.FC<TransitionPresentationComponentProps<CustomShapeChangeProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const { direction } = passedProps;
  const width = WIDTH;
  const height = HEIGHT;

  // Unique clip path IDs for SVGs
  const [clipId] = useMemo(() => [`clip-${Math.random()}`], []);

  // Calculate the path based on the direction
  const getClipPath = (progress: number): string => {
    const offset = interpolate(progress, [0, 1], [height, -height / 2], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.out(Easing.ease),
    });

    if (direction === 'bottom-left') {
      return `
        M 0 ${height}
        L ${width} ${height}
        L ${width} ${offset}
        L 0 ${offset + height / 2}
        Z
      `;
    }

    if (direction === 'bottom-right') {
      return `
        M ${width} ${height}
        L 0 ${height}
        L 0 ${offset}
        L ${width} ${offset + height / 2}
        Z
      `;
    }
    if (direction === 'top') {
      return `
    M 0 0
    L ${width} 0
    L ${width} ${height - offset}
    L 0 ${height - offset}
    Z
  `;
    }

    // Default path (fallback)
    return `
      M 0 0
      L ${width} 0
      L ${width} ${height - offset}
      L 0 ${height - offset}
      Z
    `;
  };

  const clipPathD = getClipPath(presentationProgress);

  return (
    <AbsoluteFill>
      {presentationDirection === 'exiting' && <AbsoluteFill>{children}</AbsoluteFill>}
      <AbsoluteFill style={{ clipPath: `url(#${clipId})` }}>
        {presentationDirection === 'entering' && children}
        <svg width="100%" height="100%">
          <defs>
            <clipPath id={clipId}>
              <path d={clipPathD} />
            </clipPath>
          </defs>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default SlidePresentation;

export const customSlideTransition = (
  props: CustomShapeChangeProps
): TransitionPresentation<CustomShapeChangeProps> => {
  return { component: SlidePresentation, props };
};
