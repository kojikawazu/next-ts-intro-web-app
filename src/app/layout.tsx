import './globals.css';

/**
 * Rootレイアウトコンポーネント
 * @param param0 
 * @returns 
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="ja">
      <body>
          {children}
      </body>
    </html>
  );
};
