import '@/app/globals.css';

/**
 * Introレイアウトコンポーネント
 * @param param0 
 * @returns 
 */
export default function IntroLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      {children}
    </>
  );
};
