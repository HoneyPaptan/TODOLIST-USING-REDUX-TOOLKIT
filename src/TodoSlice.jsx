import { createSlice } from "@reduxjs/toolkit";
// acts a house where all state stores and get updated based on any action
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateTodo: (state, action) =>{
      const { id, newText} =  action.payload // bringing the new text and its id
      const todo = state.find((todo) => todo.id === id) //finding the todo item if it exist or not
      if(todo){
        todo.text = newText // changing the old text for the new one
      }

    }
  },
});
export const { addTodo, toggleComplete, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;