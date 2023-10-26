import { isEnvProd, isEnvDev } from '@/app/shared/utils//utilities';
import { customLog } from '@/app/shared/utils/logUtilities';

/**
 * Cloud Functionsへログ送信
 * @param logs
 * @param loglevel
 */
export const sendLogsToGCF = async (logs: string[], logLevel: 'ERROR' | 'INFO' | 'DEBUG' = 'INFO') => {
  const SEND_ERROR_LOG  = (isEnvProd() ? process.env.NEXT_PUBLIC_SEND_ERROR_LOG_PROD : process.env.NEXT_PUBLIC_SEND_ERROR_LOG) || "";
  
  const payload = { 
    messages: logs,
    level: logLevel
  };

  // 開発環境の時は送付しない
  if (isEnvDev()) {
    return ;
  }
  // 環境変数(エラーログAPI)なければ送信不可
  if (!SEND_ERROR_LOG) {
    customLog('str', 'error', "Failed to send error to GCF(No environment variables)");
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
      customLog('str', 'info', "Successfully to send error to GCF");
    } else {
      customLog('str', 'error', "Failed to send error to GCF");
    }
  } catch (error) {
    customLog('str', 'error', "Failed to send error to GCF:", error);
  }
}