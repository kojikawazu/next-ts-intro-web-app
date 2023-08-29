
/**
 * 前のIndexを返す関数
 * @param current 
 * @param length 
 * @returns Index
 */
export const getPreviousIndex = (current: number, length: number): number => {
    return current === 0 ? length - 1 : current - 1;
}

/**
 * 次のIndexを返す関数
 * @param current 
 * @param length 
 * @returns Index
 */
export const getNextIndex = (current: number, length: number): number => {
    return current === length - 1 ? 0 : current + 1;
};

/**
 * 距離の算出
 * @param currentIndex 
 * @param targetIndex 
 * @returns distance
 */
export const calculateDistance = (currentIndex: number, targetIndex: number): number => {
    return Math.abs(targetIndex - currentIndex);
}

/**
 * アニメーション時間を算出
 * @param distance 
 * @param baseDuration 
 * @returns animationDuration
 */
export const computeAnimationDuration = (distance: number, baseDuration: number): number => {
    return baseDuration * distance;
}

/**
 * アニメーションキューの更新
 * @param queue 
 * @param setCurrentIndex 
 * @returns queue
 */
export const updateAnimationQueue = (
    queue: number[], 
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
): number[] => {
    if (queue.length > 1) {
        setCurrentIndex(queue[1]);
    }
    return queue.slice(1);
}

/**
 * タイマーのセットアップとクリーンアップ
 * @param duration 
 * @param callback 
 * @returns タイムアウト関数
 */
export const setupAnimationTimer = (
    duration: number, 
    callback: () => void
): NodeJS.Timeout => {
    return setTimeout(callback, duration);
}