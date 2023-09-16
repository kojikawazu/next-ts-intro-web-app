import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { NavBarType } from '@/app/types/NavbarType';
import { SkillsType } from '@/app/types/SkillsType';
import { consoleLog } from '@/app/shared/utils/utilities';
import { useIntroData } from '@/app/contexts/introContext';
import { useLoadLimitLogic } from '@/app/features/loadlimit/useLoadLimit';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import Title from '@/app/components/common/Title';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import SkillCard from '@/app/components/skills/SkillCard';
import SkillsAndMore from '@/app/components/skills/SkillsAndMore';

/** ロード数 */
const CARD_ADDITION_COUNT = 6;

/**
 * スキルコンポーネント
 * @returns JSX
 */
const Skills = () => {
  componentStart(Skills);

  // Context
  const { introData, refData } = useIntroData();
  // hook
  const { currentLoadSum, incrementWithLimit } = useLoadLimitLogic();

  // エラーハンドリング
  if (!introData?.navbar_data || !introData?.skills_data || !refData) {
    const errorJoin = MESSAGES.ERRORS.DATA_LOADING;
    customLog(Skills, 'error', errorJoin);
    sendLogsToGCF([errorJoin], 'ERROR');
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }

  const navbarData: NavBarType = introData.navbar_data;
  const skillsData: SkillsType = introData.skills_data;

  componentJSX(Skills);
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
          currentIndex={currentLoadSum}
          cardAdditionCount={CARD_ADDITION_COUNT}
          cardTotal={skillsData.skills_cards.length}
          buttonLabel={skillsData.skills_more}
          />
      </div>
    </section>
  );
};

export default Skills;