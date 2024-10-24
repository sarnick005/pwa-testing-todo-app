import React, { useState } from "react";
import { PlusCircle, Pencil, Save, X, Trash2 } from "lucide-react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim() }]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
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
    if (editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText.trim() } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            My Todo List
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a new task..."
              />
              <button
                onClick={addTodo}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <PlusCircle size={20} />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1 px-3 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => updateTodo(todo.id)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1 break-words">{todo.text}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditTodo(todo)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
              {todos.length === 0 && (
                <li className="text-center text-gray-500 py-4">
                  No tasks yet. Add one above!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
