import DashLayout from '../pages/Layout'
import LoginPage from '@/pages/Login'
import NotFound from '@/pages/404'

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