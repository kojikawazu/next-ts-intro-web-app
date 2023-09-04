import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
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
    // エラーハンドリング
    if (!Array.isArray(menuList) || menuList.length === 0) {
        consoleLog("[NormalMenu]: " + MESSAGES.ERRORS.DATA_ERROR);
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
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