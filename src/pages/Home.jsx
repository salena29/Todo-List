import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

const Home = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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
    if (!title.trim() || !description.trim()) return;
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: "Pending",
    };
    save([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    save(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, title: editTitle, description: editDescription } : t
    );
    save(updated);
    cancelEdit();
  };

  const toggleStatus = (id) => {
    const updated = todos.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" }
        : t
    );
    save(updated);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

      {/* Add Task Input Fields */}
      <div className="mb-6 space-y-2">
        <input
          className="w-full border p-2 rounded"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>

      {/* Task Table */}
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">S.No</th>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
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
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  t.title
                )}
              </td>
              <td className="p-2">
                {editId === t.id ? (
                  <input
                    className="border p-1 w-full"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  t.description
                )}
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs cursor-pointer ${
                    t.status === "Completed"
                      ? "bg-gray-300 text-green-800"
                      : "bg-gray-200 text-yellow-800"
                  }`}
                  onClick={() => toggleStatus(t.id)}
                >
                  {t.status}
                </span>
              </td>
              <td className="p-2 space-x-2">
                {editId === t.id ? (
                  <>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => saveEdit(t.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => startEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteTodo(t.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
