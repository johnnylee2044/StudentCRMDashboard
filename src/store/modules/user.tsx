//user related state
import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '@/utils/request'
import Cookies from 'js-cookie'
const userStore=createSlice({
    name:'user',
    initialState:{
       token:Cookies.get('token')||'',
       username:''
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
            Cookies.set('token',action.payload)
        }
        ,
        setUsername:(state,action)=>{
            state.username=action.payload
            
        },
        


    },
})
const {setToken,setUsername}=userStore.actions


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
   const res= await request.post('/login',loginForm)
   dispatch(setToken(res.data.data))
   return res.data
})
const reducer=userStore.reducer

export {fetchLogin,setToken,setUsername}
export default reducer