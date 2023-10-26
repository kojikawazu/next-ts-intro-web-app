import React, { useRef } from 'react';
import { useScrollTop, useScrollToRef } from '@/app/hooks/useScroll';

/**
 * テスト用のスクロールコンポーネント
 * @returns 
 */
const ScrollComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTop = useScrollTop();
  const scrollToRef = useScrollToRef(ref);

  return (
    <>
      <button onClick={scrollTop}>Scroll to Top</button>
      <button onClick={scrollToRef}>Scroll to Ref</button>
      <div ref={ref} data-testid="scroll-div" />
    </>
  );
};

export default ScrollComponent;
