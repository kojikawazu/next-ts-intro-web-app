import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
import { validateArrays } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import NormalHMenuLink from '@/app/components/navbar/normal/NormalHeaderMenuLink';

/** Propsの型定義 */
type NormalMenuProps = {
    menuList: Array<NavBarMenuType>;
}

/**
 * NormalMenuコンポーネント
 * @returns JSX
 */
const NormalMenu: React.FC<NormalMenuProps> = ({
    menuList
}) => { 
     // Props検証
     const arrayError  = validateArrays([menuList], MESSAGES.ERRORS.NOT_ARRAYS)
     const errors = [arrayError].filter(e => e !== null && e !== undefined);
     if (errors.length > 0) {
         consoleLog(`[NormalMenu]: ${errors.join(' ')}`);
         return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
     }

    return (
        <>
            <div className="flex mt-3 mr-3 border-black">
                {menuList.map((menu, index) => {
                    const isLastItem = menuList.length - 1 !== index;
                    const menuItemStyle = `px-6 ${isLastItem ? "border-r border-black" : "border-black"}`;
                    const btnStyles = "hover:text-gray-500";
                    
                    return (
                        <NormalHMenuLink
                            key={menu.label}
                            menuClass={menuItemStyle}
                            ariaLabel={`Navigate to ${menu.ariaLabel} section`}
                            btnClass={btnStyles}
                            onClick={menu.action}
                            btnLabel={menu.label} />
                    );
                })}
            </div>
        </>
    );
};

export default NormalMenu;