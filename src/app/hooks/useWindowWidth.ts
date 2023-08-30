import { useState, useEffect } from 'react';

/** 画面幅のカスタムhook */
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // resizeイベントにハンドラを追加
        window.addEventListener('resize', handleResize);

        // クリーンアップ関数（コンポーネントがアンマウントされた際にイベントリスナーを削除）
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
};