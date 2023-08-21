import React from 'react';
import Title from '../common/Title';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { ContactType } from '@/app/types/ContactType';

/**
 * Contactコンポーネント
 * @returns JSX
 */
const Contact = () => {
    // Context
    const { introData, refData } = useIntroData();
    const navbarData: NavBarType = introData!.navbar_data;
    const contactData: ContactType = introData!.contact_data;

    return (
        <div className="w-full h-[900px] bg-white" ref={refData?.contactRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.contact_name} />
            </div>

            <div className="h-[600px]">
                <form className="">
                    <div className="flex justify-center mb-6">
                        <div className="w-1/3">
                            <label htmlFor="name" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                {contactData.contact_name}
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input 
                                id="name" 
                                name="text" 
                                type="name" 
                                className="form-control w-1/2" 
                                placeholder={contactData.contact_name}/>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="w-1/3">
                            <label htmlFor="email" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                {contactData.contact_email}
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                className="form-control w-1/2" 
                                placeholder={contactData.contact_email}/>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="w-1/3">
                            <label htmlFor="message" className="form-label block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                {contactData.contact_contents}
                            </label>
                        </div>
                        <div className="w-2/3">
                            <textarea 
                                id="message" 
                                name="message" 
                                className="form-control w-1/2" 
                                rows={5}></textarea>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <button 
                            type="submit" 
                            className="btn btn-primary bg-lblue p-3 w-[300px] h-[60px] rounded-xl shadow-lg">
                            {contactData.contact_btn_name}
                        </button>
                    </div>
                </form>
            </div> 
        </div>
    );
};

export default Contact;

/**
 * 
 * 
 * <div className="mb-3">
                    <label htmlFor="email">{contactData.contact_email}</label>
                    <input id="email" name="email" type="email" className="form-control" placeholder={contactData.contact_email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">{contactData.contact_contents}</label>
                    <textarea id="message" name="message" className="form-control" rows={5}></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">送信</button>
                </div>
 */