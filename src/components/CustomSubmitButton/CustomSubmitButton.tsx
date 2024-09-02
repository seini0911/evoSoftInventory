import React from 'react'


const CustomSubmitButton = ({buttonText, isActive}: {buttonText: string, isActive: boolean}) => {
  return (
    <>
        <div className="!mt-8">
            <button disabled={isActive} type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            {buttonText}
            </button>
         </div>
    </>
  )
}

export default CustomSubmitButton
