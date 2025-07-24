import { useEffect, useState } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../redux/features/todoApiSlice";
import { onDelete, onToggle, onUpdate } from "../lib/todo";

const TodoItem = ({ todo }) => {
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo?.title || "");

  useEffect(() => {
    setNewText(todo?.title || "");
  }, [todo?.title]);

  if (!todo || !todo._id) return null;

  const handleSave = () => {
    if (newText.trim() && newText.trim() !== todo.title) {
      onUpdate(todo._id, newText, updateTodo);
    }
    setIsEditing(false);
    setNewText(todo.title);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewText(todo.title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.isCompleted
          ? "bg-gray-50 border-gray-200 opacity-75"
          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <button
        onClick={() => onToggle(todo, updateTodo)}
        disabled={isUpdating}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer ${
          todo.isCompleted
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {todo.isCompleted && (
          <svg
            className="w-3 h-3 mx-auto mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        ) : (
          <span
            className={`block text-gray-800 cursor-pointer transition-all duration-200 ${
              todo.isCompleted
                ? "line-through text-gray-500"
                : "hover:text-blue-600"
            }`}
            onClick={() => !todo.isCompleted && setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && !todo.isCompleted && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
            title="Edit task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo._id, deleteTodo)}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
          title="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
