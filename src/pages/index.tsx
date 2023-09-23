import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { Provider } from 'react-redux';

import { IntroDataType } from '@/app/types/IntroType';
import { IntroRefType } from '@/app/types/IntroRefType';
import { IntroDataProvider } from '@/app/contexts/introContext';
import { store } from '@/app/features/store';
import IntroLayout from './layout';
import NavBar from '@/app/components/navbar/NavBar';
import Hero from '@/app/components/hero/Hero';
import About from '@/app/components/about/About';
import Careers from '@/app/components/careers/Careers';
import Skills from '@/app/components/skills/Skills';
import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/footer/Footer';
import FrontArea from '@/app/components/front/FrontArea';

// ISG(Incremental Static Generation)
// ローカルからJSON取得する場合
// export const getStaticProps: GetStaticProps = async () => {
//     const filePath = path.resolve('./resources/json/navbar_intro.json');

//     // jsonデータ読み取り
//     const tempData = await fsPromises.readFile(filePath, 'utf-8');
//     const parsedData: IntroDataType = JSON.parse(tempData);

//     return {
//         props: {
//           data: parsedData,
//         },
//         revalidate: 10,
//     }
// };

// SSG
// クラウドからJSON取得する場合
export const getStaticProps: GetStaticProps = async () => {
  const endpoint = process.env.NEXT_PUBLIC_GET_INTRO_JSON || ""; 

  try {
      const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }

      const parsedData: IntroDataType = await response.json();

      return {
          props: {
              data: parsedData,
          },
          revalidate: 10,
      };
  } catch (error) {
      console.error('Error fetching data from Cloud Functions:', error);
      return {
          props: {
              data: {},  // エラーの場合のデフォルトのデータを設定するか、またはエラーハンドリングを追加
          }
      };
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
  const aboutRef   = useRef<HTMLDivElement>(null);
  const careerRef  = useRef<HTMLDivElement>(null);
  const skillsRef  = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const refData    = { aboutRef, careerRef, skillsRef, contactRef } as IntroRefType;

  return (
    <Provider 
      store={store}>
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
          <FrontArea />
        </IntroLayout>
      </IntroDataProvider>
    </Provider>
  );
};

export default IntroHomePage;