import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import Logo from '../components/Logo';
import Cross from '../components/Cross';

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle: z.string(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title,
    fontSize: 60,
    fontWeight: '500',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  const subtitleSplit = useTextSplitter({
    text: props.subtitle,
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* The background component is always the same setup like this.
      Get's it's input from the root */}
      <Background {...props.background} />
      <Logo logo={props.logo} size={250} x={WIDTH * 0.5} y={HEIGHT * 0.45} delay={30} />
      <Cross delay={17} x={WIDTH * 0.3} y={HEIGHT * 0.75} />
      <Cross delay={30} x={WIDTH * 0.6} y={HEIGHT * 0.85} />
      <Cross delay={35} x={WIDTH * 0.8} y={HEIGHT * 0.5} />

      <div
        style={{
          ...titleSplit.style,
          marginTop: 400,
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={10} y={-200} />
      </div>

      <div
        style={{
          ...subtitleSplit.style,
          color: colorVar('primaryText'),
        }}
      >
        <TitleTextFromRight text={subtitleSplit.text} startAt={18} y={-100} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;
