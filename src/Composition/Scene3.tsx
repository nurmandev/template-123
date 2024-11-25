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

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '700',
    letterSpacing: '5px',
    maxLines: 6,
    maxWidth: 700,
  });

  return (
    <AbsoluteFill>
      <ImageOverlay img={props.img} />
      <Logo logo={props.logo} x={WIDTH * 0.9} y={HEIGHT * 0.9} size={100} delay={5} />
      <Cross delay={50} x={WIDTH * 0.49} y={HEIGHT * 0.08} />
      <Cross delay={55} x={WIDTH * 0.06} y={HEIGHT * 0.08} />
      <Cross delay={60} x={WIDTH * 0.06} y={HEIGHT * 0.82} />
      <Cross delay={60} x={WIDTH * 0.49} y={HEIGHT * 0.82} />
      <Image
        img={props.img}
        delay={6}
        size={HEIGHT * 0.7}
        start={{ x: WIDTH * 0.1, y: HEIGHT * 1.15 }}
        end={{ x: WIDTH * 0.1, y: HEIGHT * 0.15 }}
        startRotation={45}
      />

      <div
        style={{
          ...titleSplit.style,
          margin: 100,
          textAlign: 'right',
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={10} y={HEIGHT * 1.15} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene3;