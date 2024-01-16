import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
    name : "counter",
    initialState : {
        cnt : 0
    },
    reducers : {
        increment : (state, action) => {
            state.cnt++
        },
        decrement : (state, action) => {
            state.cnt--
        },
        reset : (state, action) => {
            state.cnt = 0;
        },
    }
})

export const { increment, decrement, reset } = counter.actions

export default counter.reducer