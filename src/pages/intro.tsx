import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import { promises as fsPromises } from 'fs';

import { IntroDataType } from '@/app/types/IntroType';
import { IntroRefType } from '@/app/types/IntroRefType';
import { IntroDataProvider } from '@/app/contexts/introContext';
import IntroLayout from './layout';
import NavBar from '@/app/components/navbar/NavBar';
import Hero from '@/app/components/hero/Hero';
import About from '@/app/components/about/About';
import Careers from '@/app/components/careers/Careers';
import Skills from '@/app/components/skills/Skills';
import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/footer/Footer';

// ISG(Incremental Static Generation)
export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.resolve('./resources/json/navbar_intro.json');

    // jsonデータ読み取り
    const tempData = await fsPromises.readFile(filePath, 'utf-8');
    const parsedData: IntroDataType = JSON.parse(tempData);

    return {
        props: {
          data: parsedData,
        },
        revalidate: 10,
    }
};

// Propsの型
interface Props {
  data: IntroDataType;
};

/**
 * Introホームページコンポーネント
 * @param param0 
 * @returns 
 */
const IntroHomePage: React.FC<Props> = ({ data }) => {
  // ref
  const aboutRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const refData = { aboutRef, careerRef, skillsRef, contactRef } as IntroRefType;

  return (
    <IntroDataProvider 
      initialData={ data } 
      initialRefData={ refData }>
      <IntroLayout>
        <NavBar />
        <Hero />
        <About />
        <Careers />
        <Skills />
        <Contact />
        <Footer />
        {/**
         * <NavBar />
         * <Hero />
           <About />
           <Careers />
           <Skills />
           <Contact />
           <Footer /> */}
      </IntroLayout>
    </IntroDataProvider>
  );
};

export default IntroHomePage;