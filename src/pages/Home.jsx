import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

const Home = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const storageKey = `todos-${user.username}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setTodos(saved);
  }, []);

  const save = (newTodos) => {
    localStorage.setItem(storageKey, JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = { id: Date.now(), name: task, status: "Pending" };
    save([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (id) => {
    save(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.name);
  };

  const saveEdit = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, name: editText } : t
    );
    save(updated);
    setEditId(null);
    setEditText("");
  };

  const toggleStatus = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" } : t
    );
    save(updated);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          className="bg-fuchsia-500 text-white px-4 py-2 rounded hover:bg-fuchsia-600"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <p className="mb-6">
        Welcome back, <span className="font-semibold">{user.username}</span>!
      </p>

      <div className="flex mb-6">
        <input
          className="flex-1 border p-2 rounded-l"
          placeholder="Enter new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">S.No</th>
            <th className="p-2">Task Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t, i) => (
            <tr key={t.id} className="border-t text-center">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">
                {editId === t.id ? (
                  <input
                    className="border p-1 w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  t.name
                )}
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs cursor-pointer ${
                    t.status === "Completed" ? "bg-green-200" : "bg-yellow-200"
                  }`}
                  onClick={() => toggleStatus(t.id)}
                >
                  {t.status}
                </span>
              </td>
              <td className="p-2 space-x-2">
                {editId === t.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => saveEdit(t.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-orange-400 text-white px-2 py-1 rounded"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTodo(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
