import { useState } from "react";
import { addTodo } from "../lib/todo";
import { useCreateTodoMutation } from "../redux/features/todoApiSlice";

const AddTodo = () => {
  const [createTodo] = useCreateTodoMutation();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, createTodo);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
