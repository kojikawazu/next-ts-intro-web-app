/**
 * 先頭へスクロールするhook
 */
export const useScrollTop = () => {
    window.scroll({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

/**
 * コンポーネントへスクロール移動するhook
 * @param refData React.RefObject<HTMLDivElement>
 */
export const useScrollToRef = (refData: React.RefObject<HTMLDivElement> | undefined | null) => {
    return () => {
        if (refData) {
            refData.current?.scrollIntoView({
                behavior: 'smooth' 
            });
        }
    }
};