import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: 1,
        name: "Bilol",
        isComplete: true,
      },
      {
        id: 2,
        name: "Abdurahmon",
        isComplete: false,
      },
      {
        id: 3,
        name: "Ahmad",
        isComplete: false,
      },
    ],
    selAdd: "",
    inpAdd: "",
    selEdit: "",
    inpEdit: "",
    idx: null,
    infoStatus: false,
    infoName: "",
    inpSearch: "",
    select: "",
  },
  reducers: {
    deleteUser: (state, action) => {
      state.todos = state.todos.filter((elem) => {
        return elem.id != action.payload;
      });
    },
    setSelAdd: (state, action) => {
      state.selAdd = action.payload;
    },
    setInpAdd: (state, action) => {
      state.inpAdd = action.payload;
    },
    addUser: (state, action) => {
      let newUser = {
        id: state.todos.length + 1,
        name: state.inpAdd,
        isComplete: state.selAdd == "active" ? true : false,
      };
      state.todos.push(newUser);
    },
    infoUSer: (state, action) => {
      let user = state.todos.find((elem) => elem.id == action.payload);
      state.infoName = user.name;
      state.infoStatus = user.isComplete;
    },
    setSelEdit: (state, action) => {
      state.selEdit = action.payload;
    },
    setInpEdit: (state, action) => {
      state.inpEdit = action.payload;
    },
    editShow: (state, action) => {
      state.inpEdit = action.payload.name;
      state.selEdit = action.payload.isComplete ? "active" : "inactive";
      state.idx = action.payload.id;
    },
    editUser: (state, action) => {
      state.todos.map((elem) => {
        if (elem.id == state.idx) {
          elem.name = state.inpEdit;
          elem.isComplete = state.selEdit == "Active" ? true : false;
        }
        return elem;
      });
    },
    setInpSearch: (state, action) => {
      state.inpSearch = action.payload;
    },
    searchUser: (state, action) => {
      state.todos = state.todos.filter((elem) => {
        return elem.name
          .trim()
          .toLowerCase()
          .includes(state.inpSearch.trim().toLowerCase());
      });
    },
    setSelect: (state, action) => {
        state.select = action.payload
    },
    selectUser: (state, action) => {
        state.todos = state.todos.filter((elem) => {
            return state.select == "active" ? elem.isComplete == true : state.select == "inactive" ? elem.isComplete == false : elem
        })
    }
  },
});

export const { deleteUser } = todoList.actions;

/// add
export const {
  setSelAdd,
  setInpAdd,
  addUser,
  editShow,
  infoUSer,
  editUser,
  setSelEdit,
  setInpEdit,
  setInpSearch,
  searchUser,
  selectUser,
  setSelect
} = todoList.actions;

export default todoList.reducer;
