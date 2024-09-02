
import { useTranslation } from 'react-i18next'
import LoginForm from '../../components/LoginForm/LoginForm';
const Login = () => {
    const { t } = useTranslation();
  return (   
    <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-5">
            <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                <div>
                    <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                    {t('app_name')}
                    </h2>
                    <p className="text-sm mt-6 text-gray-800">
                       {t('app_description')}
                    </p>
                </div>
               <LoginForm/>
            </div>
        </div>
    </div>
  )
}

export default Login
