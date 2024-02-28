import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"users",
    initialState:[],
    reducers:{
        addUser(state,action){
            state.push(action.payload);
        },
        updateUser(state,action){
            const { id, value } = action.payload;
            return state.map(user => (user.id === id ? { ...user, value } : user));
        },
        removeUser(state,action){
            state.splice(action.payload,1)
        },
        deleteAllUser(state,action){
            return [];
        }
    }
})

export default todoSlice.reducer;
export const {addUser,updateUser,removeUser,deleteAllUser} = todoSlice.actions;