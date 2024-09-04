// import { UserCircleIcon } from '@heroicons/react/24/solid'
import React, { forwardRef } from 'react'


interface CustomInputFieldProps {
    labelText: string;
    inputType: string;
    placeHolderText: string;
}
const CustomInputField = forwardRef<HTMLInputElement, CustomInputFieldProps>(function CustomInputField(props, ref){
    const {labelText, inputType, placeHolderText} = props;
    
  return (
    <>
        <div className='mb-4'>
            <label className="text-gray-800 text-sm mb-2 block">{labelText}</label>
            <div className="relative flex items-center">
                <input 
                type={inputType} 
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                placeholder={ placeHolderText }
                ref={ref}
                required  />
                
                {/* <UserCircleIcon className="size-8 text-gray-500 h-4 absolute right-4 cursor-pointer" /> */}
            </div>
        </div>
    </>
  )
});

export default CustomInputField
