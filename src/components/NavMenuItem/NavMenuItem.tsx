import React from 'react'


const NavMenuItem = ({menuItem}:{menuItem:string}) => {
  return (
    <div>
        <li className='max-lg:border-b max-lg:py-3 px-3'>
            <a href='javascript:void(0)'
            className='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'>{menuItem}</a>
        </li>
    
            {/* <li className='mb-6 hidden max-lg:block'>
                <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                </a>
            </li> */}
            {/* <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
                className='hover:text-[#007bff] text-[#333] block font-bold text-[15px]'>Source</a>
            </li>
            </ul> */}
    </div>
  )
}

export default NavMenuItem
