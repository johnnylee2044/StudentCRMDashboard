import DashLayout from '../pages/Layout/index.tsx'
import LoginPage from '@/pages/Login'
import NotFound from '@/pages/404/index.tsx'

import{createBrowserRouter} from 'react-router-dom'

const router =createBrowserRouter([
    {
        path:'/dashboard',
        element:<DashLayout/>
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