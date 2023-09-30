import React, { useState } from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
import { 
    validatePropsFilter, 
    validateFunctionProps,
    validateArraysProps,
    validateStringProps
} from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import HamburgerOpenBtn from '@/app/components/navbar/hamburger/HamburgerOpenBtn';
import HamburgerCloseBtn from '@/app/components/navbar/hamburger/HamburgerCloseBtn';
import NavBarTitle from '@/app/components/navbar/title/NavBarTitle';
import HamburgerLink from '@/app/components/navbar/hamburger/HamburgerLink';
import ArrowIcon from '@/app/components/common/icons/ArrowIcon';

/** Propsの型定義 */
type HamburgerMenuProps = {
    menuList: Array<NavBarMenuType>;
    navBarTitleAriaLabel: string;
    navBarTitleBtnClass: string;
    navBarTitleOnClick: () => void;
    navBarTitleLabel: string;
}

/**
 * ハンバーガーメニューコンポーネント
 * @returns JSX
 */
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    menuList,
    navBarTitleAriaLabel,
    navBarTitleBtnClass,
    navBarTitleOnClick,
    navBarTitleLabel
}) => {
    componentStart(HamburgerMenu);

    // state
    const [isOpen, setIsOpen] = useState(false);
    // handle
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    // Props検証
    const functionError = validateFunctionProps([navBarTitleOnClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const arrayError  = validateArraysProps([menuList], MESSAGES.ERRORS.NOT_ARRAYS);
    const stringError   = validateStringProps([navBarTitleAriaLabel, navBarTitleBtnClass, navBarTitleLabel], MESSAGES.ERRORS.NOT_STRING);
    const errors      = validatePropsFilter([functionError, arrayError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(HamburgerMenu, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    // CSS
    const baseClass      = ['z-40', 'top-0', 'left-0', 'fixed', 'w-full', 'h-screen', 'pt-24', 'px-3'];
    const textClass      = ['text-left'];
    const colorClass     = ['bg-lblue-opacity-09'];
    const animationClass = ['ease-linear', 'duration-300'];
    const flexClass      = ['flex', 'flex-col', 'justify-start'];
    const actionClass    = [{ 'top-[-120%]': !isOpen }, { 'h-[10%]': !isOpen}];
    const navClass       = classNames(baseClass, textClass, colorClass, animationClass, flexClass, actionClass);

    componentJSX(HamburgerMenu);
    return (
        <>
            {/* nav */}
            <nav className={navClass}>
                <div className="absolute top-8 left-0 w-30 h-5">
                    <NavBarTitle 
                        ariaLabel={navBarTitleAriaLabel}
                        btnClass={navBarTitleBtnClass}
                        onClick={() => {
                            navBarTitleOnClick();
                            toggleMenu();
                        }}
                        label={navBarTitleLabel} /> 
                </div>
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
                            iconComponent={
                                <ArrowIcon  
                                    angleCSS="rotate-90"
                                    iconSize={24} />
                            } />
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