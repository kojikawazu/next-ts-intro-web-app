import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/consoleLog';
import { useIntroData } from '@/app/contexts/introContext';
import { useLoadLimitLogic } from '@/app/features/loadlimit/useLoadLimit';
import { NavBarType } from '@/app/types/NavbarType';
import { SkillsType } from '@/app/types/SkillsType';
import Title from '@/app/components/common/Title';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import SkillCard from './SkillCard';
import SkillsAndMore from './SkillsAndMore';

/** ロード数 */
const CURRENT_INDEX = 6;

/**
 * スキルコンポーネント
 * @returns JSX
 */
const Skills = () => {
  // Context
  const { introData, refData } = useIntroData();
  // hook
  const { currentLoadSum, incrementWithLimit } = useLoadLimitLogic();

  // エラーハンドリング
  if (!introData?.navbar_data || !introData?.skills_data || !refData) {
    consoleLog("Skillsコンポーネントのデータが不足しています");
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }

  const navbarData: NavBarType = introData.navbar_data;
  const skillsData: SkillsType = introData.skills_data;

  return (
    <section 
      className="w-full h-full bg-skills" 
      ref={refData.skillsRef}>
      <div className="flex justify-center content-center pt-32 pb-6">
          <Title titleName={navbarData.skills_name} />
      </div>
      
      <div className="flex flex-wrap justify-center pb-10">
        {skillsData.skills_cards.map((skill, index) => {
          if (index >= currentLoadSum) return null;
          return (
            <SkillCard key={`skill_${index}`} skill={skill} />
          )
        })}
      </div>

      <div className="flex justify-center py-5 pb-12">
        <SkillsAndMore
          updateCardDisplayLimit={incrementWithLimit}
          currentIndex={CURRENT_INDEX}
          cardTotal={skillsData.skills_cards.length}
          buttonLabel={skillsData.skills_more}
          />
      </div>
    </section>
  );
};

export default Skills;