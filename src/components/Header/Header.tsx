
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../context/LanguageContext';
const Header = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const { t } = useTranslation();
    const {language, handleLanguageChange} = useContext(LanguageContext) ?? {};
    const showDropDown = ()=> setDropDown(!dropDown);
    const changeLanguage = (lang: string)=>{
        showDropDown();
        try {
            if(handleLanguageChange) handleLanguageChange(lang);
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <header className='fixed top-0 left-0 z-50 w-screen font-sans tracking-wide shadow-md'>
        <section className='py-2 bg-[#007bff] text-white text-center items-center px-10'>
            <div className='flex flex-wrap items-center justify-end gap-6'>
                <p className='text-sm'>
                    <strong className="mx-3">Address:</strong>
                    Douala, Cameroon
                    <strong className="mx-3">
                        Contact No:
                    </strong>
                    691323656
                </p>
                <div className='flex flex-wrap'>
                    <div className="relative  font-[sans-serif] w-max mx-auto ">
                        <button 
                            type="button"
                            onClick={showDropDown}
                            className="px-5 py-2.5 border border-gray-300 text-white text-sm outline-none bg-blue-500 hover:bg-blue-300">
                             {language ?? 'en'}
                        </button>
                        { 
                        dropDown &&<ul
                        className="absolute shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto">
                            <li 
                            onClick={()=>changeLanguage('en')}
                            className='px-5 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50'>{t('en_lng')}</li>
                            <li
                             onClick={()=>changeLanguage('fr')} 
                            className='px-5 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50'>{t('fr_lng')}</li>
                        </ul>
                        } 
                     </div>
                </div>
            </div>
        </section>
    </header> 
  );
}

export default Header;
