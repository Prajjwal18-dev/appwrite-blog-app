import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // actions
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            userData = null;
        }
    }

})

export const {login,logout} = authSlice.actions;  // actions exported

export default authSlice.reducer;