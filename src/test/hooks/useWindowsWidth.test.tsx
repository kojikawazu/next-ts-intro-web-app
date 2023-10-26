import React from 'react';
import { render, act } from '@testing-library/react';
import { useWindowWidth } from '@/app/hooks/useWindowWidth';

interface MockWindowObject {
  innerWidth?: number;
}

const mockWindowObject = (obj?: MockWindowObject) => {
  global.window = obj as any;
};

// フックを使用するテストコンポーネントを作成
const TestComponent = () => {
  const width = useWindowWidth();

  return (
    <div>{width}</div>
  );
};

describe('useWindowWidth', () => {
  it('should return current window width and update on resize', () => {
    mockWindowObject(window);

    // Windowオブジェクトをセットアップ
    global.innerWidth = 500;
    
    // コンポーネントをレンダー
    const { getByText } = render(<TestComponent />);
    
    // 初期値が正しいか確認
    expect(getByText('500')).toBeInTheDocument();

    act(() => {
      // window.innerWidthを新しい値に変更
      global.innerWidth = 1000;
      // resizeイベントを発火
      global.dispatchEvent(new Event('resize'));
    });

    // 更新された値が正しいか確認
    expect(getByText('1000')).toBeInTheDocument();
  });
});
