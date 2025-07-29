import React, { useState } from "react";

const Todo = ({ todo, onDelete, onToggle, onEdit, onUpdate }) => {
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
  });

  return (
    <div className="bg-gray-300 p-4 border rounded shadow flex flex-col">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2"
        />
        {todo.isEditing ? (
          <div className="flex-1">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full p-1 mb-1 bg-blue-50 border rounded"
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full p-1 mb-2 bg-blue-50 border rounded"
            />
            <button
              onClick={() => onUpdate(todo.id, editData.title, editData.description)}
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => onEdit(todo.id)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex-1">
            <h2 className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.title}
            </h2>
            <p className={`text-sm ${todo.completed ? "line-through text-gray-400" : ""}`}>
              {todo.description}
            </p>
          </div>
        )}
      </div>
      {!todo.isEditing && (
        <div className="mt-2 space-x-2">
          <button
            onClick={() => onEdit(todo.id)}
            className=" bg-gray-50 text-black px-3 py-1 rounded hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-gray-50 text-black px-3 py-1 rounded hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
