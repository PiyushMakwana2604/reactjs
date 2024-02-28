import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name:"users",
    initialState:[],
    reducers:{
        addRestaurant(state,action){
            return action.payload;
        },
    }
})

export default restaurantSlice.reducer;
export const {addRestaurant} = restaurantSlice.actions;