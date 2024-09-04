
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
       
       <form className="max-w-md md:ml-auto w-full" onSubmit={handleSubmit(onLogin)}>
            { wrongCredentials && (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4" role="alert">
                    <strong className="font-bold text-sm mr-4">{t('error')}</strong>
                    <span className="block text-sm sm:inline max-sm:mt-2">{t('error_wrong_credentials')}</span>
                </div>
            )}
            <h2 className="text-gray-800 text-center text-2xl font-bold mb-4">
                {t('authentication')}
            </h2>
            
             <div className='mb-4'>
                <label className="text-gray-800 text-sm mb-2 block">{t('username')}</label>
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
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder={t('enter_email')}
                    required  /> 
                    <br/>
                    <UserIcon className='size-8 w-4 h-4 absolute right-4 cursor-pointer text-gray-500'/>
                 </div>
                    {errors.email &&(
                        <div className='text-red-500 text-sm'>{errors.email.message}</div>
                    )}
            </div>
            <div className='mb-4'>
                <label className="text-gray-800 text-sm mb-2 block">{t('password')}</label>
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
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder={t('enter_password')}
                    required  /> 
                    <EyeIcon className='size-8 w-4 h-4 absolute right-4 cursor-pointer text-gray-500'/>
                    {/* <UserCircleIcon className="size-8 text-gray-500 h-4 absolute right-4 cursor-pointer" /> */}
                </div>
                    {errors.password &&(
                        <div className='text-red-500 text-sm'>{errors.password.message}</div>
                    )}
            </div> 
            <CustomSubmitButton isActive={isSubmitting} buttonText={ isSubmitting ? 'Loading...':  t('login')}/>
        </form>
    </>
  )
}

export default LoginForm
