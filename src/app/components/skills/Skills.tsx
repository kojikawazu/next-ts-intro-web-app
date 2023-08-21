import React from 'react';
import Title from '../common/Title';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { SkillsType, SkillsCardType } from '@/app/types/SkillsType';
import SkillCard from './SkillCard';

/**
 * スキルコンポーネント
 * @returns JSX
 */
const Skills = () => {
  // Context
  const { introData, refData } = useIntroData();
  const navbarData: NavBarType = introData!.navbar_data;
  const skillsData: SkillsType = introData!.skills_data;
  
  return (
    <div className="w-full h-[900px] bg-skills" ref={refData?.skillsRef}>
      <div className="flex justify-center content-center pt-32 pb-6">
          <Title titleName={navbarData.skills_name} />
      </div>
      
      <div className="flex flex-wrap justify-center pb-10">
        {skillsData.skills_cards.map((skill, index) => (
          <div key={index}>
            <SkillCard skill={skill} />
          </div>
        ))}
      </div>

      <div className="flex justify-center py-5">
        {skillsData.skills_more}
      </div>
    </div>
  );
};

export default Skills;