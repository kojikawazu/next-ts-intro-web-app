
/** GCFへ送付するURL */
const GCF_URL = process.env.NEXT_PUBLIC_SEND_ERROR_LOG || "";

/**
 * Cloud Functionsへログ送信
 * @param logs ログ
 */
export const sendLogsToGCF = async (logs: string[], logLevel: 'ERROR' | 'INFO' | 'DEBUG' = 'INFO') => {
    const payload = { 
        messages: logs,
        level: logLevel
    };

    // 開発環境の時は送付しない
    if (process.env.NODE_ENV === 'development') {
        return ;
    }

    try {
      const response = await fetch(GCF_URL, {
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