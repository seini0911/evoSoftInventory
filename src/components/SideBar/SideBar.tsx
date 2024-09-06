
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
      <nav className="bg-white shadow-lg h-screen py-2 px-8 font-[sans-serif] overflow-auto">
        <div className="mt-2">
          <h2 className='mb-5 text-xl font-bold'>{t('greeting')} <br/> {user?.name} </h2>
          <h6 className="px-4 text-sm font-bold text-blue-600">Information</h6>
          <ul className="mt-3">
            {userRoutes && userRoutes.map((route: SideBarRoute)=>(
              <li key={route.name}>
              <Link to={route.path}
                className="flex items-center px-4 py-3 text-sm text-black transition-all rounded hover:text-blue-600 hover:bg-blue-50">
                { route.icon }
                <span>{t(route.key)}</span>
              </Link>
              <hr/>
            </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h6 className="px-4 text-sm font-bold text-blue-600">Actions</h6>
          <ul className="mt-3">
            <li>
              <a onClick={logoutUser}
                className="flex items-center px-4 py-3 text-sm text-black transition-all rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50">
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
