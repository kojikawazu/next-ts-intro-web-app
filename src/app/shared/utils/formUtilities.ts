import { ChangeEvent } from "react";

/**
 * 入力値変更処理
 * @param e 
 * @param setter 
 */
export const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: Function) => {
    setter(e.target.value);
}