import DashLayout from '@/pages/Layout'
import LoginPage from '@/pages/Login'
import NotFound from '@/pages/404'
import AuthRoute from '@/components/AuthRoute/AuthRoute'
import{createBrowserRouter} from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const SimCard=lazy(()=>import('@/components/SimCard/simcard'))
const EMP=lazy(()=>import('@/components/EmpModules'))
const Sales=lazy(()=>import('@/components/Sales/sales'))
const router =createBrowserRouter([
     {
    path: '/',
    element: <Navigate to="/login" replace />
    },
    {
        path:'/dashboard',
        // element:<DashLayout/><AuthRoute></AuthRoute>,
        element:<DashLayout/>,
        children:[
            {
                path:'employees',
                element:<Suspense fallback="Loading"><EMP/></Suspense>
            },
            {
                path:'sales',
                element:<Suspense fallback="Loading"><Sales/></Suspense>
            },
            {
                path:'simcard',
                element:<Suspense fallback="Loading"><SimCard/></Suspense>
            },
            // {
            //     path:'test',
            //     element:<Suspense fallback="Loading"></Suspense>
            // }
        ]
    },
    {
        path:'/login',
        
        element:<LoginPage/>

    },
    {
         path: '*',
        element: <NotFound />
    }
])

export default router