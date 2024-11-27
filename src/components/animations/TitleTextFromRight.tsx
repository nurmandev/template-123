import { Fragment } from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

export const TitleTextFromRight = ({
  text,
  startAt = 0,
  x = 0,
  y = 0,
}: {
  text: string;
  startAt?: number;
  x?: number;
  y?: number;
}) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');

  const lineTranslateY = interpolate(frame - startAt, [0, 40], [y, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const lineTranslateX = interpolate(frame - startAt, [0, 40], [x, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const lineScale = interpolate(frame - startAt, [0, 60], [1.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transform: `translate(${lineTranslateX}px,${lineTranslateY}px) scale(${lineScale})`,
      }}
    >
      {lines.map((line, lineIndex) => {
        const lineStartFrame = startAt + lineIndex * 10;
        return (
          <p
            key={lineIndex}
            style={{
              margin: 0,
              position: 'relative',
              display: 'inline-block',
              lineHeight: '80px',
            }}
          >
            {line.split('').map((char, charIndex) => {
              if (char === ' ') {
                return (
                  <span key={`space-${lineIndex}-${charIndex}`} style={{ display: 'inline-block' }}>
                    &nbsp;
                  </span>
                );
              }
              const charStartFrame = lineStartFrame + charIndex;

              const translateY = interpolate(frame - charStartFrame, [0, 5], [20, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              });

              const opacity = interpolate(frame - charStartFrame, [0, 5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              });

              return (
                <Fragment key={`char-${lineIndex}-${charIndex}`}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateY(${translateY}px)`,
                      opacity,
                      fontStyle: 'italic',
                    }}
                  >
                    {char}
                  </span>
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
