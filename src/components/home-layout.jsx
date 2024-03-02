import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo, updateTodo } from "../TodoSlice";

export function HomeLayout() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState(""); // State for editing text
  const [editId, setEditId] = useState(null); // State for storing the id of the item being edited
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

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText && editId !== null) {
      dispatch(updateTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900">
        <div className="container py-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl dark:text-gray-50">To-Do List</h1>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-800">
        <div className="container py-6 space-y-6 md:space-y-8">
          <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
            <Input type="text" value={text} onChange={handleInputChange} />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
          <div className="divide-y">
            {todos.map((todo) => (
              <li key={todo.id} className="grid sm:grid-cols-2  items-center py-2">
                {editId === todo.id ? (
                  <>
                    <Input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <Button onClick={handleSaveEdit}>Save</Button>
                  </>
                ) : (
                  <>
                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                    <div className="flex justify-end space-x-2">
                      <Button onClick={() => handleToggleComplete(todo.id)}>
                        {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                      </Button>
                      <Button onClick={() => handleEdit(todo.id, todo.text)}>Edit</Button>
                      <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
