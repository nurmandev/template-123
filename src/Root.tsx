import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 30,
          scene1Duration: 140,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'Genuine Parts, Genuine Riders',
            subtitle: 'www.bobsmorcycles.com',
          },
          scene2Duration: 170,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            title: "Riders know the thrill-- it's not just a motorcycle; it's part of who you are",
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              'When your BMW \n or Ducati needs maintainance, finding the right parts is crucial',
          },
          scene4Duration: 180,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title: 'We offer only genuine parts because we know quality matters',
          },
          scene5Duration: 210,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title:
              'Get premium, authentic parts and personalized service from fellow riders who understand your passion',
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'Visit us at 10720 Guilford Road, Jessup, MD',
            subtitle: 'Call us today! 800.269.2627',
          },
        }}
      />
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 30,
          scene1Duration: 140,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'Genuine Parts, Genuine Riders',
            subtitle: 'www.bobsmorcycles.com',
          },
          scene2Duration: 170,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            title: "Riders know the thrill-- it's not just a motorcycle; it's part of who you are",
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              'When your BMW \n or Ducati needs maintainance, finding the right parts is crucial',
          },
          scene4Duration: 180,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title: 'We offer only genuine parts because we know quality matters',
          },
          scene5Duration: 210,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title:
              'Get premium, authentic parts and personalized service from fellow riders who understand your passion',
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'Visit us at 10720 Guilford Road, Jessup, MD',
            subtitle: 'Call us today! 800.269.2627',
          },
        }}
      />
    </>
  );
};
