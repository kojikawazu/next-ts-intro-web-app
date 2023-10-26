import { isEnvProd, isEnvDev, isEnvTest } from '@/app/shared/utils/utilities';
import { MESSAGES } from "@/app/shared/constants/constants";

describe('Environment Utilities', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('isEnvProd', () => {
        it('should return true if NODE_ENV is production', () => {
            const ORIGINAL_ENV = process.env;
            process.env = { ...ORIGINAL_ENV, NODE_ENV: 'production' };

            expect(isEnvProd()).toBe(true);
            process.env = ORIGINAL_ENV;
        });

        it('should return false if NODE_ENV is not production', () => {
            expect(isEnvProd()).toBe(false);
        });
    });

    describe('isEnvDev', () => {
        it('should return true if NODE_ENV is development', () => {
            const ORIGINAL_ENV = process.env;
            process.env = { ...ORIGINAL_ENV, NODE_ENV: 'production' };
            
            expect(isEnvDev()).toBe(false);
            process.env = ORIGINAL_ENV;
        });

        it('should return false if NODE_ENV is not development', () => {
            const ORIGINAL_ENV = process.env;
            process.env = { ...ORIGINAL_ENV, NODE_ENV: 'development' };
            expect(isEnvDev()).toBe(true);
            process.env = ORIGINAL_ENV;
        });
    });

    describe('isEnvTest', () => {
        it('should return true if NODE_ENV is test', () => {
            const ORIGINAL_ENV = process.env;
            process.env = { ...ORIGINAL_ENV, NODE_ENV: 'test' };
            expect(isEnvTest()).toBe(true);
            process.env = ORIGINAL_ENV;
        });

        it('should return false if NODE_ENV is not test', () => {
            const ORIGINAL_ENV = process.env;
            process.env = { ...ORIGINAL_ENV, NODE_ENV: 'production' };
            expect(isEnvTest()).toBe(false);
            process.env = ORIGINAL_ENV;
        });
    });
});
