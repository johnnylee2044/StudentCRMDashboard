import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
const store = configureStore({
    reducer: {
        user: userReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false, 
    // }),
});


export type AppDispatch = typeof store.dispatch;
export default store;