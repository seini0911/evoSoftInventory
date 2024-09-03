// import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className=" font-[sans-serif] min-h-screen flex  flex-wrap overflow-hidden items-center justify-center">  
        <div className="w-1/5 bg-red-200 ">
            <SideBar/>
        </div>
        <div className="container w-4/5 items-center justify-center flex flex-wrap h-screen py-6 px-6 overflow-y-auto">
          <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard
