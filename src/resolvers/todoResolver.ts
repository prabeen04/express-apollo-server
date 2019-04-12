import Todo from '../models/TodoSchema';
import ITodo from '../models/Interface/TodoInterface';

export const getTodos: any = async (_: any, args: any) => {
    const newTodo: ITodo[] = await Todo.find();
    console.log(newTodo)
    return newTodo
}