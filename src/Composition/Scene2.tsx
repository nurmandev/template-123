import { AbsoluteFill } from 'remotion';

import { z } from 'zod';
import Image from '../components/Image';
import Logo from '../components/Logo';
import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { HEIGHT, WIDTH } from '../lib/consts';
import Cross from '../components/Cross';
import ImageOverlay from '../components/ImageOverlay';
import StarDustZoomIn from '../components/StarDustZoomIn';

export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '700',
    letterSpacing: '6px',
    maxLines: 6,
    maxWidth: 700,
  });

  return (
    <AbsoluteFill>
      <ImageOverlay img={props.img} />
      <StarDustZoomIn origin={{ x: WIDTH * 0.3, y: HEIGHT * 0.4 }} maxParticleSize={10} speed={3} />
      <Logo logo={props.logo} x={WIDTH * 0.93} y={HEIGHT * 0.1} size={100} />

      <Cross delay={50} x={WIDTH * 0.84} y={HEIGHT * 0.08} />
      <Cross delay={55} x={WIDTH * 0.42} y={HEIGHT * 0.08} />
      <Cross delay={60} x={WIDTH * 0.42} y={HEIGHT * 0.82} />
      <Cross delay={60} x={WIDTH * 0.84} y={HEIGHT * 0.82} />
      <Image
        img={props.img}
        delay={10}
        size={HEIGHT * 0.7}
        start={{ x: WIDTH * 0.5, y: HEIGHT * 1.15 }}
        end={{ x: WIDTH * 0.46, y: HEIGHT * 0.15 }}
        startRotation={45}
      />

      <div
        style={{
          ...titleSplit.style,
          margin: 100,
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={10} y={HEIGHT * 1.12} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene2;
