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
import Glow from '../components/Glow';

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

      <Glow color="rgba(230,0, 0, 0.8)" x={WIDTH * 0.7} y={0} startAt={1} />

      <Glow
        color="rgba(255,255, 255, 1)"
        radius={800}
        startAt={1}
        x={0}
        y={HEIGHT * 0.5}
        overlayOpacity={0.5}
      />
      <StarDustZoomIn origin={{ x: WIDTH * 0.8, y: HEIGHT * 0.4 }} maxParticleSize={10} speed={2} />
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
        strokeDirection="right-left"
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
