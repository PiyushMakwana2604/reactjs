import { configureStore } from "@reduxjs/toolkit";
// import { todoSlice } from "./slices/todoslice";
import todoslice from "./slices/todoslice";
import restaurantSlice from "./slices/restaurantSlice";
const store = configureStore({
    reducer:{
        todo:todoslice,
        restaurant:restaurantSlice,
    },
})

export default store;