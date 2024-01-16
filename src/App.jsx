import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";

import {
  addUser,
  deleteUser,
  setInpAdd,
  setSelAdd,
  infoUSer,
  editShow,
  setSelEdit,
  setInpEdit,
  editUser,
  setInpSearch,
  searchUser,
  setSelect,
  selectUser
} from "./reducer/todo/todos";

const App = () => {
  const dispatch = useDispatch();

  /// todo
  const todos = useSelector((store) => store.todos.todos);

  /// dialogAdd
  const [open, setOpen] = React.useState(false);
  let selAdd = useSelector((store) => store.todos.selAdd);
  let inpAdd = useSelector((store) => store.todos.inpAdd);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  /// dialogEdit
  const [openEdit, setOpenEdit] = React.useState(false);
  let selEdit = useSelector((store) => store.todos.selEdit);
  let inpEdit = useSelector((store) => store.todos.inpEdit);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  /// info
  const [openInfo, setOpenInfo] = React.useState(false);
  let infoStatus = useSelector((store) => store.todos.infoStatus);
  let infoName = useSelector((store) => store.todos.infoName);
  const handleOpenInfo = (id) => {
    setOpenInfo(true);
    dispatch(infoUSer(id));
  };
  const handleCloseInfo = () => setOpenInfo(false);

  /// search
  const inpSearch = useSelector((store) => store.todos.inpSearch)

  /// select
  const select = useSelector((store) => store.todos.select)

  return (
    <>
      <div className="flex items-center justify-between p-[20px] px-[200px]">
        <h1 className="text-[30px] font-[600]">Todo List</h1>
        <div className="flex items-center gap-[15px]">
            <TextField label="Search" value={inpSearch} onInput={() => {dispatch(searchUser()); console.log("hello");}} onChange={(event) => dispatch(setInpSearch(event.target.value))} />
            <select value={select} onClick={() => dispatch(selectUser())} onChange={(event) => dispatch(setSelect(event.target.value))} className="p-[20px] py-[15px] rounded-[4px] outline-none border-gray-300 border-[1px]" name="" id="">
                <option value="">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <Button variant="contained" onClick={handleOpen}>
              Add New +
            </Button>
        </div>
      </div>
      <table className="table m-[20px] mx-[200px]">
        <thead className="thead text-[25px] border-b-[2px] border-b-black">
          <th className="w-[500px]">Name</th>
          <th className="w-[300px]">Status</th>
          <th className="w-[300px]">Actions</th>
        </thead>
        <tbody className="tbody">
          {todos.map((elem) => {
            return (
              <tr
                key={elem.name}
                className="text-[20px]  border-b-[1px] border-b-black"
              >
                <td className="p-[10px] text-center w-[500px] bg-gray-100">
                  {elem.name}
                </td>
                <td className="text-center w-[300px] bg-gray-100">
                  {" "}
                  <Button
                    variant="contained"
                    color={elem.isComplete ? "success" : "inherit"}
                  >
                    {elem.isComplete ? "Active" : "Inactive"}
                  </Button>{" "}
                </td>
                <td className="text-center flex items-center gap-[20px] p-[10px] w-[300px] bg-gray-100">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteUser(elem.id))}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => {dispatch(editShow(elem)); handleOpenEdit()}}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenInfo(elem.id)}
                  >
                    Info
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* dialogAdd */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <h1 className="text-[20px]">Add User</h1>
            <Button onClick={handleClose}>
              {" "}
              <Close />{" "}
            </Button>
          </div>
          <div className="flex flex-col gap-[10px] text-end">
            <TextField
              label="Name"
              value={inpAdd}
              onChange={(event) => dispatch(setInpAdd(event.target.value))}
              className="w-[300px]"
            />
            <select
              value={selAdd}
              onChange={(event) => dispatch(setSelAdd(event.target.value))}
              className="w-[300px] border-gray-300 p-[15px] rounded-[3px] border-[1px]"
            >
              <option value="">Choose Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex items-center gap-[15px]">
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(addUser());
                  handleClose();
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* info dialog */}
      <Modal
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <h1 className="text-[20px]">Info User</h1>
            <Button onClick={handleCloseInfo}>
              {" "}
              <Close />{" "}
            </Button>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[30px] font-600">Name : {infoName}</h1>
            <h1 className="text-[30px] font-600">
              Status :{" "}
              <Button
                variant="contained"
                color={infoStatus ? "success" : "inherit"}
              >
                {infoStatus ? "Active" : "Inactive"}
              </Button>
            </h1>
          </div>
        </Box>
      </Modal>
      {/* dialogEdit */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between mb-[20px]">
            <h1 className="text-[20px]">Edit User</h1>
            <Button onClick={handleCloseEdit}>
              {" "}
              <Close />{" "}
            </Button>
          </div>
          <div className="flex flex-col gap-[10px] justify-end">
            <TextField
              label="Name"
              value={inpEdit}
              onChange={(event) => dispatch(setInpEdit(event.target.value))}
              className="w-[300px]"
            />
            <select
              value={selEdit}
              onChange={(event) => dispatch(setSelEdit(event.target.value))}
              className="w-[300px] border-gray-300 p-[15px] rounded-[3px] border-[1px]"
            >
              <option value="">Choose Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex items-center gap-[15px]">
              <Button variant="contained" onClick={handleCloseEdit}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(editUser());
                  handleCloseEdit();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default App;
