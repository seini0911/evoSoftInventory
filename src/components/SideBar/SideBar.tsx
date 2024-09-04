
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { SideBarRoute, sideBarRoutes } from './SideBarRoutes'
import { useTranslation } from 'react-i18next'

const SideBar = () => {
  const {t}= useTranslation();
  const {user, logoutUser} = useContext(AuthContext)??{};
  let userRoutes: SideBarRoute[] = [];
  //get routes based on the type of user loggedIn and ignore the others
  if(user) {
    userRoutes = sideBarRoutes.filter((route) => route.isAdmin === user.isAdmin);
  }
  return (
    <>
      <nav className="bg-white shadow-lg h-screen py-7 px-6 font-[sans-serif] overflow-auto">
        <div className="mt-12">
          <h2 className='font-bold text-xl mb-5'>{t('greeting')} <br/> {user?.name} </h2>
          <h6 className="text-blue-600 text-sm font-bold px-4">Information</h6>
          <ul className="mt-3">
            {userRoutes && userRoutes.map((route: SideBarRoute)=>(
              <li key={route.name}>
              <Link to={route.path}
                className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                { route.icon }
                <span>{route.name}</span>
              </Link>
              <hr/>
            </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
          <ul className="mt-3">
            <li>
              <a onClick={logoutUser}
                className="cursor-pointer text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 6.35 6.35">
                  <path
                    d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    data-original="#000000" />
                </svg>
                <span>{t('logout')}</span>
              </a>
            </li>
          </ul>
        </div> 
      </nav>
    </>
  )
}

export default SideBar
