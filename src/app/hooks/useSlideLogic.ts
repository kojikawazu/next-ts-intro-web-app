import { useState, useCallback } from 'react';
import { getPreviousIndex, 
        getNextIndex, 
        calculateDistance, 
        computeAnimationDuration,
        setupAnimationTimer } from '@/app/shared/utils/slideUtilities';

/** アニメーション時間 */
const BASE_ANIMATION_DURATION = 500;

/**
 * スライドアニメーションのカスタムhooks
 * @param length 
 * @returns hooks
 */
export const useSlideLogic = (length: number) => {
    // State
    // 現在の番号
    const [currentIndex, setCurrentIndex]           = useState(0);
    // アニメーション時間
    const [animationDuration, setAnimationDuration] = useState(BASE_ANIMATION_DURATION);
    // アニメーションを実行するためのインデックスのキュー
    const [animationQueue, setAnimationQueue]       = useState<number[]>([]);

    // Functions
    // 前のカード番号を設定する
    const goToPrevCardIndex = useCallback(() => {
        setCurrentIndex((prev) => getPreviousIndex(prev, length));
    }, [length]);

    // 次のカード番号を設定する
    const goToNextCardIndex = useCallback(() => {
        setCurrentIndex((next) => getNextIndex(next, length));
    }, [length]);

    // カード番号をジャンプする
    const jumpToCardIndex = useCallback((targetIndex: number) => {
        const distance = calculateDistance(currentIndex, targetIndex);
        const duration = computeAnimationDuration(distance, BASE_ANIMATION_DURATION);
        setAnimationDuration(duration);
        setCurrentIndex(targetIndex);
    }, [currentIndex]);

    // キューの更新
    const updateQueue = (queue: number[]) => {
        if (queue.length > 1) {
            setCurrentIndex(queue[1]);
        }
        return queue.slice(1);
    }

    // アニメーショントリガー
    const animationTrigger = () => {
        if (animationQueue.length > 0) {
            setCurrentIndex(animationQueue[0]);
        }
    }

    // アニメーションの期間とキューの進行を処理
    const slideAnimation = () => {
        if (currentIndex !== animationQueue[0]) return () => {};

        const timer = setupAnimationTimer(animationDuration, () => {
            setAnimationQueue(prevQueue => updateQueue(prevQueue));
        });

        return () => clearTimeout(timer);
    }

    return {
        currentIndex,
        setCurrentIndex,
        animationDuration,
        goToPrevCardIndex,
        goToNextCardIndex,
        jumpToCardIndex,
        updateQueue,
        animationTrigger,
        slideAnimation
    };
};