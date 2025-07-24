export const addTodo = async (text, createTodo) => {
  try {
    await createTodo({
      title: text,
    });
  } catch (error) {
    console.log(error);
  }
};

export const onToggle = async (todo, updateTodo) => {
  try {
    await updateTodo({
      id: todo._id,
      data: { isCompleted: !todo.isCompleted },
    });
  } catch (error) {
    console.log(error);
  }
};

export const onUpdate = async (id, newText, updateTodo) => {
  try {
    await updateTodo({ id, data: { title: newText } });
  } catch (error) {
    console.log(error);
  }
};

export const onDelete = async (id, deleteTodo) => {
  try {
    await deleteTodo(id);
  } catch (error) {
    console.log(error);
  }
};
