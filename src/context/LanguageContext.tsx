import React, { createContext, useEffect, useState } from "react";
import { HandleLocalStorage } from "../utils/HandleLocalStorage";
import i18n from "../utils/i18n";

interface LanguageContextProps{
    language: string,
    handleLanguageChange: (lang: string) => void;
}

//create a language context that will be a string e.g en|fr
export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({children}: {children: React.ReactNode})=>{

    const {getItemFromLocalStorage, setItemInLocalStorage} = HandleLocalStorage('lng');
    const [language, setLanguage] = useState<string>(
        getItemFromLocalStorage != undefined ? JSON.stringify(getItemFromLocalStorage): 'en'
    );
    //watch for any language change in the application 
    useEffect(()=>{
        i18n.changeLanguage(language);
        console.log('Changing language');
    },[language]);
    //function that hadles switching from one language to another
    const handleLanguageChange = (lang: string)=>{
        setLanguage(lang);
        setItemInLocalStorage(lang);
    }

    return (
        <LanguageContext.Provider 
        value={{ language, handleLanguageChange}}
        >
            {children}
        </LanguageContext.Provider>
    );
}