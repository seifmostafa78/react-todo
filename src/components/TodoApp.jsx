import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useTodosQuery } from "../redux/features/todoApiSlice";

const TodoApp = () => {
  const { data: todos } = useTodosQuery();
  const completedCount = todos?.filter((todo) => todo.isCompleted).length;
  const totalCount = todos?.length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <AddTodo />
          {totalCount > 0 && (
            <div className="mt-4 text-white/90 text-sm">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </div>
        <div className="p-6">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
