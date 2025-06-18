//user related state
import {request} from '@/utils'
import {createSlice} from '@reduxjs/toolkit'
const userStore=createSlice({
    name:'user',
    initialState:{
       token:''
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        }

    }
})
const fetchLogin=async (loginForm)=>{
    return async (dispatch)=>{ 
        const res= await request.post('/authorizations',loginForm)
        dispatch(setToken(res.data.token))
    }

}
const reducer=userStore.reducer
const {setToken}=userStore.actions
export {fetchLogin,setToken}
export default reducer