import { createSlice } from "@reduxjs/toolkit";

export const ClientAuth = createSlice({
    name:'Client',
    initialState:{
        Token    : null,
        userName : null,
        email    : null,
        userData : null,
        id       : null,
    },
    reducers:{
        ClientLogin(state,action){
            state.Token = action.payload.token
        },
        ClientLogout(state,action){
            state.Token = ""
            state.email = ""
            state.userName = "",
            state.userData = ""
        },
        ClientName(state,action){
            state.userName = action.payload.name
        },
        ClientEmail(state,action){
            state.email = action.payload.email
        },
        ClientData(state,action){
            state.userData = action.payload.userData
            console.log(state.userData,'success');
        },
        ClientId(state,action){
            state.id = action.payload.id
            console.log( state.userData);
        }
    }
})

export const {ClientLogin,ClientLogout,ClientName,ClientEmail,ClientData} = ClientAuth.actions
export const Clientreducer= ClientAuth.reducer;
