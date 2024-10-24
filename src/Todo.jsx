import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const updateTodo = (id) => {
    if (editingText) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl text-center">Todo App</h1>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between p-2 border-b">
            {editingId === todo.id ? (
              <div className="flex">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                />
                <button
                  onClick={() => updateTodo(todo.id)}
                  className="bg-green-500 text-white p-1 rounded ml-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <span>{todo.text}</span>
            )}
            <div>
              {editingId === todo.id ? (
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white p-1 rounded mr-2"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => startEditTodo(todo)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
