// import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from './../../components/SideBar/SideBar';

const Dashboard = () => {
  return (
    <>
      {/* header */}
        <Header/>
      <div className='container flex max-h-screen overflow-auto'>  
        {/* SideBar */}
        <div className="fixed hidden w-64 h-screen text-white md:block">
            <SideBar/>
        </div>
        {/* main content */}
        <div className="font-[sans-serif] flex-1 ml-0 md:ml-64 p-6 h-screen mt-24 md:mt-16">  
          <div className='container min-h-screen px-auto'>
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
