import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo, updateTodo } from "./TodoSlice";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const Todo = () => {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("") // for handling the editing text
  const [editId, setEditId] = useState(null) // for storing the id of the element we need to edit
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleEdit = (id, text) =>{
    setEditId(id)
    setEditText(text)

  }
  const handleSaveEdit = () => {
    if (editText && editId !== null) {
      dispatch(updateTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText("");
    }
  };
  return (
    <div className="flex items-center justify-center w-1/2 h-full ">
      <Input type="text" value={text} onChange={handleInputChange} />{" "}
      <Button onClick={handleAddTodo}> Add Todo </Button>{" "}
      <ul>
        {" "}
        {todos.map((todo) => (
         <li key={todo.id}>
         {editId === todo.id ? (
           <>
             <Input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
             <Button onClick={handleSaveEdit}>Save</Button>
           </>
         ) : (
           <>
             <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
             <Button onClick={() => handleToggleComplete(todo.id)}>
               {todo.completed ? "Mark Incomplete" : "Mark Complete"}
             </Button>
             <Button onClick={() => handleEdit(todo.id, todo.text)}>Edit</Button>
             <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
           </>
         )}
       </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
};

export default Todo;