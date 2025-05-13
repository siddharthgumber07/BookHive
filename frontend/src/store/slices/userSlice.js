import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const userSlice=createSlice({
    name:"user",
    initialState:{
        users:[],
        loading:false,
        error:null,
        message:null,
        isAuthenticated:false
    },
    reducers:{
        fetchAllUsersRequest(state){
            state.loading=true;
        },
        fetchallUserSuccess(state,action){
            state.loading=false;
            state.users=action.payload;
        },
        fetchAllUsersFailure(state){
            state.loading=false;
        },

        addNewAdminRequest(state){
            state.loading=true;
        },
        addNewAdminSuccess(state,action){
            state.loading=false;
            
        },
        addNewAdminFailure(state){
            state.loading=false;
        },
    }
})



export const fetchAllUsers=()=>async(dispatch)=>{
    dispatch(userSlice.actions.fetchAllUsersRequest());
    await axios.get('http://localhost:4000/api/v1/user/all',{withCredentials:true})
    .then((res)=>{
        dispatch(userSlice.actions.fetchallUserSuccess(res.data.users));
    })
    .catch((err)=>{
        dispatch(userSlice.actions.fetchAllUsersFailure(err.response.data.message));
    })
};


export const addNewAdmin=(data)=>async(dispatch)=>{
    dispatch(userSlice.actions.addNewAdminRequest());
    await axios.post('http://localhost:4000/api/v1/user/add/new-admin',data,{
        withCredentials:true,
        headers:{
            'Content-Type':'mutipart/form-data'
        },
    })
    .then((res)=>{
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(res.data.message);
    })
    .catch((err)=>{
        dispatch(userSlice.actions.addNewAdminFailure());
        toast.error(err.response.data.message);
    })
}


export default userSlice.reducer;