import React, { useState } from "react";
import Todo from "../components/Todo";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleAddTodo = () => {
    if (!formData.title || !formData.description) return alert("Both fields are required!");
    const newTodo = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      completed: false,
      isEditing: false,
    };
    setTodos([newTodo, ...todos]);
    setFormData({ title: "", description: "" });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleUpdate = (id, updatedTitle, updatedDesc) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: updatedTitle,
              description: updatedDesc,
              isEditing: false,
            }
          : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4 text-center"> Create your Todo-List</h1>
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-2 bg-blue-50 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-2 bg-blue-50 border rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button
          onClick={handleAddTodo}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
        >
          Add Task
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-6 space-y-3">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleToggleComplete}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
