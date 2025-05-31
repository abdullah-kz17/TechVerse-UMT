import {configureStore} from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice.js";
import claimSlice from "./slices/claimSlice.js";


export const store = configureStore({
    reducer:{
        post:postSlice,
        claim:claimSlice,
    }
})