import React from 'react'
import { useTranslation } from 'react-i18next';

const CustomAlert = ({alertType, message}:{alertType: string, message: string}) => {
    const {t} = useTranslation();
  return (
    <>
        <div className="font-[sans-serif] space-y-6">
            {
                /** SUCCESS ALERT  */
                alertType==='success'&&(
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg" role="alert">
                         <strong className="font-bold text-sm mr-4">{t('success')}</strong>
                            <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
                    </div>
                )
            }
            {
                 /** WARNING ALERT  */
               alertType==='warning'&&(
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg" role="alert">
                        <strong className="font-bold text-sm mr-4">{t('warning')}</strong>
                        <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
                    </div>
               ) 
            }
            {
                 /** ERROR ALERT  */
               alertType==='error'&&(
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
                        <strong className="font-bold text-sm mr-4">{t('error')}</strong>
                        <span className="block text-sm sm:inline max-sm:mt-2">{message}.</span>
                    </div>
               ) 
            }
            {
                 /** INFO ALERT  */
               alertType==='info'&&(
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg" role="alert">
                        <strong className="font-bold text-sm mr-4">{t('info')}</strong>
                        <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
                    </div>
               ) 
            }
        </div>  
    </>
  )
}

export default CustomAlert;
