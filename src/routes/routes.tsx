import { createBrowserRouter, Link } from "react-router-dom";
import Login from '../pages/login/Login.tsx';
// import Dashboard from '../pages/dashboard/Dashboard.tsx';
import ProtectedRoutes from "../utils/ProtectedRoutes.tsx";
import Layout from "../layout/Layout.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import AdminDashboard from "../pages/dashboard/AdminDashboard.tsx";
import InventoryList from "../pages/inventory/InventoryList.tsx";
import EmployeesList from "../pages/employees/EmployeesList.tsx";
import ProductsList from "../pages/products/ProductsList.tsx";
import StoresList from "../pages/stores/StoresList.tsx";
import NewInventory from "../pages/inventory/NewInventory.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {   
                path:'/',
                element: <Login/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'dashboard',
                element: <ProtectedRoutes/>,
                children:[
                    {
                        path:'admin',
                        element: <Dashboard/>,
                        children: [
                            {
                                path: '',
                                element: <AdminDashboard/>
                            },
                            {
                                path: 'inventory',
                                element: <InventoryList/>
                            },
                            {
                                path: 'employees',
                                element: <EmployeesList/>
                            },
                            {
                                path: 'products',
                                element: <ProductsList/>
                            },
                            {
                                path: 'stores',
                                element: <StoresList/>
                            },
                            {
                                path: 'earnings',
                                element: <h1>Earnings dashboard</h1>
                            },

                        ]
                    },
                    {
                        path:'employee',
                        element: <Dashboard/>,
                        children: [
                            {
                                path : 'inventory',
                                element: <InventoryList/>
                            },
                            {
                                path : 'new/inventory',
                                element: <NewInventory/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path:'*',
        element:  (
            <>
            <div className="container text-center flex flex-wrap flex-col items-center">
                 <h1 className="text-5xl text-red-500 mb-8 mt-10">404 Page not found</h1>
                 <Link to="/" className="bg-blue-500 px-6 py-4 text-white mx-2 rounded-full w-1/2 text-center">Back to Home</Link>
            </div>
            </>
        ),
    },
   
])