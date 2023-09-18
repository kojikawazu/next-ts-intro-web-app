
/**
 * Cloud Functionsへログ送信
 * @param logs
 * @param loglevel
 */
export const sendLogsToGCF = async (logs: string[], logLevel: 'ERROR' | 'INFO' | 'DEBUG' = 'INFO') => {
  const IS_ENV          = process.env.NODE_ENV                        || "production";
  const SEND_ERROR_LOG  = process.env.NEXT_PUBLIC_SEND_ERROR_LOG_PROD || "";

  const payload = { 
    messages: logs,
    level: logLevel
  };

  // 開発環境の時は送付しない
  if (IS_ENV === 'development') {
    return ;
  }
  // 環境変数(エラーログAPI)なければ送信不可
  if (!SEND_ERROR_LOG) {
    console.error("Failed to send error to GCF(No environment variables)");
    return;
  }

  try {
    const response = await fetch(SEND_ERROR_LOG, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      console.log("Successfully to send error to GCF");
    } else {
      console.error("Failed to send error to GCF");
    }
  } catch (error) {
    console.error("Failed to send error to GCF:", error);
  }
}