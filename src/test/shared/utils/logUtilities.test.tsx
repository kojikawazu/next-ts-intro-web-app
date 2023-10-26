
import React from 'react';
import { getComponentName, customDebug, customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import * as utilities from '@/app/shared/utils/logUtilities';
import { isEnvDev } from '@/app/shared/utils/utilities';
import { render } from '@testing-library/react';

jest.mock('@/app/shared/utils//utilities', () => ({
    isEnvDev: jest.fn(),
}));

// ダミーコンポーネント
const TestComponent = () => <div>Test</div>;

describe('Utility functions', () => {

    beforeEach(() => {
        console.log = jest.fn();
        console.debug = jest.fn();
        console.error = jest.fn();
    });

    describe('getComponentName', () => {
        it('should return the display name of a component', () => {
            const result = getComponentName(TestComponent);
            expect(result).toBe('TestComponent');
        });
    });

    describe('customDebug', () => {
        it('should output a debug message when isEnvDev is true', () => {
        (isEnvDev as jest.Mock).mockReturnValue(true);
            customDebug(TestComponent, 'Test debug message', 'extra', 'params');
            expect(console.debug).toHaveBeenCalledWith('[TestComponent]: debug : ', 'Test debug message', 'extra', 'params');
        });
        it('should not output a debug message when isEnvDev is false', () => {
            (isEnvDev as jest.Mock).mockReturnValue(false);
            customDebug(TestComponent, 'Test debug message', 'extra', 'params');
            expect(console.debug).not.toHaveBeenCalled();
        });
    });

    describe('customLog', () => {
        it('should output an error message when kind is "error"', () => {
            customLog(TestComponent, 'error', 'Test error message', 'extra', 'params');
            expect(console.error).toHaveBeenCalledWith('[TestComponent]: error : ', 'Test error message', 'extra', 'params');
        });

        it('should output a log message when kind is not "error"', () => {
            customLog(TestComponent, 'info', 'Test log message', 'extra', 'params');
            expect(console.log).toHaveBeenCalledWith('[TestComponent]: log : ', 'Test log message', 'extra', 'params');
        });
    });

    describe('componentStart', () => {
        it('should call customDebug with "start..." message', () => {
            const spy = jest.spyOn(utilities, 'customDebug').mockImplementation(jest.fn());
            componentStart(TestComponent);
            expect(customDebug).toHaveBeenCalledWith(TestComponent, 'start...');
        });
    });

    describe('componentJSX', () => {
        it('should call customDebug with "JSX." message', () => {
            const spy = jest.spyOn(utilities, 'customDebug').mockImplementation(jest.fn());
            componentJSX(TestComponent);
            expect(customDebug).toHaveBeenCalledWith(TestComponent, 'JSX.');
        });
    });
});
