import { createBrowserRouter, Link, RouteObject } from "react-router-dom";
import Login from '../pages/login/Login.tsx';
import ProtectedRoutes from "../utils/ProtectedRoutes.tsx";
import Layout from "../layout/Layout.tsx";
import AdminDashboard from "../pages/dashboard/AdminDashboard.tsx";
import InventoryList from "../pages/inventory/InventoryList.tsx";
import EmployeesList from "../pages/employees/EmployeesList.tsx";
import ProductsList from "../pages/products/ProductsList.tsx";
import StoresList from "../pages/stores/StoresList.tsx";
import NewInventory from "../pages/inventory/NewInventory.tsx";
import UpdateInventory from "../pages/inventory/UpdateInventory.tsx";

const PATHS = {  
    ROOT: '/',  
    LOGIN: '/login',  
    DASHBOARD: '/dashboard',  
    ADMIN: '/dashboard/admin',  
    EMPLOYEE: '/dashboard/employee',  
    INVENTORY: '/dashboard/admin/inventory',  
    EMPLOYEES: '/dashboard/admin/employees',  
    PRODUCTS: '/dashboard/admin/products',  
    STORES: '/dashboard/admin/stores',  
    EARNINGS: '/dashboard/admin/earnings',  
    NEW_INVENTORY: '/dashboard/employee/inventory',  
    UPDATE_INVENTORY: '/dashboard/employee/update/inventory/:id',  
};  

const routes: RouteObject[] = [  
    {  
        element: <Layout />,  
        children: [  
            { path: PATHS.ROOT, element: <Login /> },  
            { path: PATHS.LOGIN, element: <Login />, }, 
        ]
    }, 
    {  
        path: PATHS.DASHBOARD,  
        element: <ProtectedRoutes />,  
        children: [  
            {  
                path: PATHS.ADMIN,  
                // element: <Dashboard />,  
                children: [  
                    { path: '', element: <AdminDashboard /> },  
                    { path: 'inventory', element: <InventoryList /> },  
                    { path: 'employees', element: <EmployeesList /> },  
                    { path: 'products', element: <ProductsList /> },  
                    { path: 'stores', element: <StoresList /> },  
                    { path: 'earnings', element: <h1>Earnings dashboard</h1> },  
                ],  
            },  
            {  
                path: PATHS.EMPLOYEE,  
                // element: <Dashboard />,  
                children: [  
                    { path: '', element: <InventoryList /> },  
                    { path: 'inventory', element: <NewInventory /> },  
                    { path: 'update/inventory/:id', element: <UpdateInventory /> },  
                ],  
            },  
        ],  
    },  
      
    {  
        path: '*',  
        element: (  
            <div className="container flex flex-col flex-wrap items-center text-center">  
                <h1 className="mt-10 mb-8 text-5xl text-red-500">404 Page not found</h1>  
                <Link to={PATHS.ROOT} className="w-1/2 px-6 py-4 mx-2 text-center text-white bg-blue-500 rounded-full">  
                    Back to Home  
                </Link>  
            </div>  
        ),  
    },  
];  

export const router = createBrowserRouter(routes);