import DashLayout from '@/pages/Layout'
import LoginPage from '@/pages/Login'
import NotFound from '@/pages/404'
import AuthRoute from '@/components/AuthRoute/AuthRoute'
import{createBrowserRouter} from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import StudentList from '@/components/StudentList/studentList'
import AiChatWindow from '@/components/AiChat/aiChat'


const router =createBrowserRouter([
     {
    path: '/',
    element: <Navigate to="/login" replace />
    },
    {
        path:'/dashboard',
        element:<AuthRoute><DashLayout/></AuthRoute>,
        element:<DashLayout/>,
        children:[
            {
                path:'students',
                element:<Suspense fallback="Loading"><StudentList/></Suspense>
            },
            {
                path:'aichat',
                element:<AiChatWindow/>
            }
    
    
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