import { isEnvDev } from '@/app/shared/utils//utilities';

/**
 * コンポート名の取得
 * @param component 
 * @returns コンポート名
 */
export const getComponentName = (component: React.ComponentType<any>): String => {
    return (component.displayName || component.name || 'Unknown');
}

/**
 * カスタムデバッグログ
 * @param component 
 * @param message 
 * @param optionalParams 可変ログ文字列
 */
export const customDebug = (component: React.ComponentType<any>, message: string, ...optionalParams: any[]) => {
    if (isEnvDev()) {
        const componentName = getComponentName(component);
        console.debug(`[${componentName}]: debug : `, message, ...optionalParams);
    }
}

/**
 * カスタムログ
 * @param component 
 * @param kind info or error
 * @param message 
 * @param optionalParams 可変ログ文字列 
 */
export const customLog = (component: React.ComponentType<any> | 'str', kind: 'info' | 'error', message: string, ...optionalParams: any[]) => {
    const componentName = (typeof component === 'function' ? getComponentName(component) : "str");
    const consoleKind   = (kind == 'error' ? 'error' : 'log');

    if (consoleKind == 'error') {
        console.error(`[${componentName}]: ${consoleKind} : `, message, ...optionalParams);
    } else {
        console.log(`[${componentName}]: ${consoleKind} : `, message, ...optionalParams);
    }    
}

/**
 * コンポーネント開始
 * @param component 
 */
export const componentStart = (component: React.ComponentType<any>) => {
    customDebug(component, "start...");
}

/**
 * JSX記法レンダリング開始
 * @param component 
 */
export const componentJSX = (component: React.ComponentType<any>) => {
    customDebug(component, "JSX.");
}