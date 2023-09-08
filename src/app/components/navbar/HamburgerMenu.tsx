import React, { useState } from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
import { validateArrays } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import HamburgerOpenBtn from '@/app/components/navbar/hamburger/HamburgerOpenBtn';
import HamburgerCloseBtn from '@/app/components/navbar/hamburger/HamburgerCloseBtn';
import HamburgerLink from '@/app/components/navbar/hamburger/HamburgerLink';

/** Propsの型定義 */
type HamburgerMenuProps = {
    menuList: Array<NavBarMenuType>;
}

/**
 * 矢印サブコンポーネント
 * @returns JSX
 */
const ArrowIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-6 h-6" 
        aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

/**
 * ハンバーガーメニューコンポーネント
 * @returns JSX
 */
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    menuList
}) => {
    // state
    const [isOpen, setIsOpen] = useState(false);
    // handle
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    // Props検証
    const arrayError  = validateArrays([menuList], MESSAGES.ERRORS.NOT_ARRAYS)
    const errors = [arrayError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[HamburgerMenu]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    // CSS
    const baseClass      = ['z-40', 'top-0', 'left-0', 'fixed', 'w-full', 'h-screen', 'pt-24', 'px-3', { 'top-[-100%]': !isOpen }];
    const textClass      = ['text-left'];
    const colorClass     = ['bg-lblue'];
    const animationClass = ['ease-linear', 'duration-300'];
    const flexClass      = ['flex', 'flex-col', 'justify-start'];
    const navClass = classNames(baseClass, textClass, colorClass, animationClass, flexClass);

    return (
        <>
            {/* nav */}
            <nav className={navClass}>
                <div className="absolute top-10 right-10 w-10 h-10">
                    <HamburgerCloseBtn
                        onClick={toggleMenu} />
                </div>
                <ul role="menu">
                        {menuList.map((menu) => (
                            <HamburgerLink
                                key={menu.label}
                                label={menu.label}
                                onClick={() => {
                                    menu.action();
                                    toggleMenu();
                                }}
                                iconComponent={<ArrowIcon />} />
                        ))}
                </ul>
            </nav>

            {/* humbergerbutton */}
            {!isOpen && (
                <HamburgerOpenBtn 
                    onClick={toggleMenu} />
            )}
        </>
    );
};

export default HamburgerMenu;