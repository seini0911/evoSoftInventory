
import CustomSubmitButton from '../CustomSubmitButton/CustomSubmitButton'
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormFields } from '../../types/FormTypes';
import { EyeIcon, UserIcon } from '@heroicons/react/16/solid';
import { employees } from './../../data/data';
import { Employee, User } from '../../types/DataType';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const { authenticateUser } = useContext(AuthContext)?? {};
    const {register, handleSubmit, formState: { errors , isSubmitting},} = useForm<LoginFormFields>();
    const { t } = useTranslation();
    const employeesList = employees;
    const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
    const onLogin: SubmitHandler<LoginFormFields> = async (data)=>{
        //create a delay to simulate a loading process
        await new Promise((resolve)=> setTimeout(resolve, 2000));
    
        //check if the form data submitted corresponds to an employee in the list of registered employees
        const employee: Employee | undefined = employeesList.find((employee)=> employee.email === data.email && employee.password === data.password);
        //if employee is found
        if(employee){
            //create a user object that has the employee information excluding the password
            const user : User = {
                name: employee.name,
                email: employee.email,
                isAdmin: employee.isAdmin
            };
            if(authenticateUser) authenticateUser(user);
            if(user?.isAdmin){
                //if the user loggedIn is an admin redirect to admin dashboard
                 navigate('/dashboard/admin')
            }else{
                //redirect to employee dashboard
                navigate('/dashboard/employee') ;
            }
        }else{
            setWrongCredentials(true);
        }  
    }
  return (
    <>
       
       <form className="w-full max-w-md md:ml-auto" onSubmit={handleSubmit(onLogin)}>
            { wrongCredentials && (
                <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg" role="alert">
                    <strong className="mr-4 text-sm font-bold">{t('error')}</strong>
                    <span className="block text-sm sm:inline max-sm:mt-2">{t('error_wrong_credentials')}</span>
                </div>
            )}
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                {t('authentication')}
            </h2>
            
             <div className='mb-4'>
                <label className="block mb-2 text-sm text-gray-800">{t('username')}</label>
                <div className="relative flex items-center"> 
                     <input 
                    {...register('email',{
                        required: t('email_required_error'),
                        validate: (value)=>{
                            if(!value.includes('@')){
                                return t('email_invalid_error');
                            }
                            return true;
                        }
                    })} 
                    type="text"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-md outline-blue-600" 
                    placeholder={t('enter_email')}
                    autoComplete='username'
                    required  /> 
                    <br/>
                    <UserIcon className='absolute w-4 h-4 text-gray-500 cursor-pointer size-8 right-4'/>
                 </div>
                    {errors.email &&(
                        <div className='text-sm text-red-500'>{errors.email.message}</div>
                    )}
            </div>
            <div className='mb-4'>
                <label className="block mb-2 text-sm text-gray-800">{t('password')}</label>
                <div className="relative flex items-center">
                    <input 
                    {...register('password',{
                        required: t('password_required_error'),
                        minLength: {
                            value: 8,
                            message: t('password_length_error')
                        }
                    })}  
                    type="password"
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-md outline-blue-600" 
                    placeholder={t('enter_password')}
                    autoComplete='current-password'
                    required  /> 
                    <EyeIcon className='absolute w-4 h-4 text-gray-500 cursor-pointer size-8 right-4'/>
                    {/* <UserCircleIcon className="absolute h-4 text-gray-500 cursor-pointer size-8 right-4" /> */}
                </div>
                    {errors.password &&(
                        <div className='text-sm text-red-500'>{errors.password.message}</div>
                    )}
            </div> 
            <CustomSubmitButton isActive={isSubmitting} buttonText={ isSubmitting ? 'Loading...':  t('login')}/>
        </form>
    </>
  )
}

export default LoginForm
