import { configureStore } from "@reduxjs/toolkit";
import counter from "../reducer/counter/counter";
import todos from "../reducer/todo/todos";

export const store = configureStore({
    reducer : {
        counter,
        todos : todos
    }
})