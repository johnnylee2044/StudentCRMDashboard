//user related state
import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '@/utils/request'
import Cookies from 'js-cookie'
const userStore=createSlice({
    name:'user',
    initialState:{
       token:Cookies.get('token')||'',
       account:''
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
            Cookies.set('token',action.payload)
        }
        ,
        setAccount:(state,action)=>{
            state.account=action.payload
            
        },
        


    },
})
const {setToken,setAccount}=userStore.actions


// const fetchLogin=(loginForm:any)=>{ 
//    return async (dispatch:any)=>{ 
//     try{
//        const res= await request.post('/login',loginForm)
//         if(res.data.code===200){
//        dispatch(setToken(res.data.data))
//        }
//         return res.data.message
       
//     }
//     catch(err){
//        console.log(err)
//     }
//    }
// }

const fetchLogin=createAsyncThunk('user/fetchLogin',async (loginForm:any,{dispatch})=>{ 
   
   const res= await request.post('api/auth/login',loginForm)
   dispatch(setToken(res.data.token))
   return res.data
})


const reducer=userStore.reducer

export {fetchLogin,setToken,setAccount}
export default reducer