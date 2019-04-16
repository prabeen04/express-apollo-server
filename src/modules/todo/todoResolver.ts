import { IResolvers } from "graphql-tools";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";

const todoResolver: IResolvers = {
  Query: {
    getTodos: async (_: any, args: any) => {
      const newTodo: ITodo[] = await Todo.find();
      console.log(newTodo);
      return newTodo;
    }
  },
  Mutation: {
    addTodo: async (_: any, args: any) => {
      const newTodo: ITodo = await Todo.create(args);
      console.log(newTodo);
      return newTodo;
    },
    updateTodo: async (_: any, args: any) => {
      const { id, ...patches } = args;
      const updateTodo: any = await Todo.findByIdAndUpdate(id, {
        $set: { ...patches }
      });
      console.log(updateTodo);
      return { ...updateTodo, ...patches };
    },
    deleteTodo: async (_: any, args: { id: string }) => {
      const { id } = args;
      console.log(id);
      const isDeleted: any = await Todo.findByIdAndDelete(id);
      console.log("after delete", isDeleted);
      return isDeleted;
    }
  }
};

export default todoResolver;