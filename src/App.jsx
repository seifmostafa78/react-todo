import TodoApp from "./components/TodoApp";

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>
        <TodoApp />
      </div>
    </main>
  );
}

export default App;
