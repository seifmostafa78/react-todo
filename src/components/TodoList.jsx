import { useTodosQuery } from "../redux/features/todoApiSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { data: todos } = useTodosQuery();
  if (todos && todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
        <p className="text-gray-500">
          Add your first task above to get started!
        </p>
      </div>
    );
  }

  const pendingTodos = todos?.filter((todo) => !todo.isCompleted);
  const completedTodos = todos?.filter((todo) => todo.isCompleted);

  return (
    <div className="space-y-6">
      {pendingTodos?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Pending ({pendingTodos?.length})
          </h3>
          <div className="space-y-2">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      )}
      {completedTodos?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Completed ({completedTodos.length})
          </h3>
          <div className="space-y-2">
            {completedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
