import { useDispatch, useSelector } from 'react-redux';
import { isValidLength, isValidEmail, isValidSpecialCharacters } from '@/app/shared/utils/validateUtilities';
import {
  setName,
  setEmail,
  setMessage,
  resetContactForm,
  setValidationErrors,
  ValidationErrors
} from '@/app/features/contact/contactSlice';
import { RootState } from '@/app/features/store';

// Constants
const ERROR_NAME = "名前の入力が正しくありません。再度入力してください。";
const ERROR_EMAIL = "Eメールアドレスの入力が正しくありません。再度入力してください。";
const ERROR_MESSAGE = "お問い合わせ内容の入力が正しくありません。再度入力してください。";

/** contactのhook */
export const useContactLogic = () => {
    // dispatch
    const dispatch = useDispatch();

    // selector
    const name             = useSelector((state: RootState) => state.contact.name);
    const email            = useSelector((state: RootState) => state.contact.email);
    const message          = useSelector((state: RootState) => state.contact.message);
    const validationErrors = useSelector((state: RootState) => state.contact.validationErrors);

    // validation
    const validate = () => {
        const errors: ValidationErrors = {};

        if (!name || !isValidLength(name, 10) || !isValidSpecialCharacters(name)) 
            errors.name = ERROR_NAME;
    
        if (!email || !isValidEmail(email)) 
            errors.email = ERROR_EMAIL;
    
        if (!message || !isValidSpecialCharacters(message)) 
            errors.message = ERROR_MESSAGE;

        dispatch(setValidationErrors(errors));
        return Object.keys(errors).length === 0;
    };

    return {
        name, 
        email, 
        message, 
        validationErrors,
        setName: (val: string) => dispatch(setName(val)),
        setEmail: (val: string) => dispatch(setEmail(val)),
        setMessage: (val: string) => dispatch(setMessage(val)),
        validate,
        reset: () => dispatch(resetContactForm()),
    };
};