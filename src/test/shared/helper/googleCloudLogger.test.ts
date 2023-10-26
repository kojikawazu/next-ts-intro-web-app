import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import { customLog } from '@/app/shared/utils/logUtilities';
import { isEnvProd, isEnvDev } from '@/app/shared/utils//utilities';

jest.mock('@/app/shared/utils/logUtilities', () => ({
  customLog: jest.fn(),
}));

jest.mock('@/app/shared/utils//utilities', () => ({
  isEnvProd: jest.fn(),
  isEnvDev: jest.fn(),
}));

global.fetch = jest.fn();

describe('sendLogsToGCF', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not send logs if environment is development', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(true);
        await sendLogsToGCF(['sample log']);
        expect(fetch).not.toHaveBeenCalled();
    });

    it('should log success if fetch is successful', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(false);
        (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 200 });
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'info', "Successfully to send error to GCF");
    });

    it('should log success if fetch is successful', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(false);
        (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 200 });
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'info', "Successfully to send error to GCF");
    });

    it('should log success if fetch is successful', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(false);
        (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 200 });
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'info', "Successfully to send error to GCF");
    });


    it('should log an error if fetch fails', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(false);
        (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 500 });
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'error', "Failed to send error to GCF");
    });

    it('should log an error if fetch fails', async () => {
        (isEnvDev as jest.Mock).mockReturnValue(false);
        (global.fetch as jest.Mock)
            .mockRejectedValue(new Error('Exception'));
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'error', "Failed to send error to GCF:", new Error('Exception'));
    });

    it('should log an error if SEND_ERROR_LOG is not set', async () => {
        (isEnvProd as jest.Mock).mockReturnValue(true);
        (isEnvDev as jest.Mock).mockReturnValue(false);
        process.env.NEXT_PUBLIC_SEND_ERROR_LOG_PROD = "";
        process.env.NEXT_PUBLIC_SEND_ERROR_LOG = "";
        await sendLogsToGCF(['sample log']);
        expect(customLog).toHaveBeenCalledWith('str', 'error', "Failed to send error to GCF(No environment variables)");
    });
});
