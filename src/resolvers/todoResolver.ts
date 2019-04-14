import Todo from "../models/TodoSchema";
import ITodo from "../models/Interface/TodoInterface";

export const getTodos: any = async (_: any, args: any) => {
  const newTodo: ITodo[] = await Todo.find();
  console.log(newTodo);
  return newTodo;
};

export const addTodo: any = async (_: any, args: any) => {
  const newTodo: ITodo = await Todo.create(args);
  console.log(newTodo);
  return newTodo;
};
export const updateTodo: any = async (_: any, args: any) => {
  const { id, ...patches } = args;
  const updateTodo: any = await Todo.findByIdAndUpdate(id, {
    $set: { ...patches }
  });
  console.log(updateTodo);
  return { ...updateTodo, ...patches };
};
export const deleteTodo: any = async (_: any, args: { id: string }) => {
  const { id } = args;
  console.log(id);
  const isDeleted: any = await Todo.findByIdAndDelete(id);
  console.log("after delete", isDeleted);
  return isDeleted;
};
