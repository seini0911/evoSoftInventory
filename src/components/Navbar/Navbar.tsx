import NavMenuItem from '../NavMenuItem/NavMenuItem';
// import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../context/LanguageContext';
const Navbar = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const menuItems: string[] = [
        'Home',
        'Account',
        'Dashboard',
        'Logout',
    ];

    const { t } = useTranslation();
    const {language, handleLanguageChange} = useContext(LanguageContext) ?? {};
    const isLoggedIn: boolean = false;
    const showDropDown = ()=> setDropDown(!dropDown);
    const changeLanguage = (lang: string)=>{
        showDropDown();
        try {
            if(handleLanguageChange) handleLanguageChange(lang);
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
    <>
    <header className='shadow-md font-sans tracking-wide relative z-50'>
        <section className='py-2 bg-[#007bff] text-white text-right px-10'>
            <div className='flex flex-wrap items-center justify-between'>
                <p className='text-sm'>
                    <strong className="mx-3">Address:</strong>
                    Douala, Cameroon
                    <strong className="mx-3">
                        Contact No:
                    </strong>
                    691323656, seiniabaya@gmail.com
                </p>
                <div className='flex flex-wrap'>
                
                    <div className="relative font-[sans-serif] w-max mx-auto">
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
                            className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>{t('en_lng')}</li>
                            <li
                             onClick={()=>changeLanguage('fr')} 
                            className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>{t('fr_lng')}</li>
                        </ul>
                        }
                        
                     </div>

                </div>

            </div>
        </section>
    
        <div className='flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]'>
            <p className='text-4xl font-bold'>Sagamal</p>
            {/* <img src="" alt="logo" className='w-36' /> */}
       
    
        <div id="collapseMenu"
            className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
          
            {/* <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
                <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
            </button> */}
            <ul
            className='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                {
                    isLoggedIn ? menuItems.map((item: string)=> <NavMenuItem key={item} menuItem={item}/>) : ''
                }
            </ul>
        </div>
    
        {/* <div className='flex max-lg:ml-auto'>
            <button id="toggleOpen" className='lg:hidden'>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            </button>
        </div> */}
        </div>
    </header> 
    </>
  )
}

export default Navbar
