import { IResolvers } from "graphql-tools";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";
import IUser from "../../models/Interface/UserInterface";
import User from '../../models/UserSchema'

const todoResolver: IResolvers = {
  Query: {
    getTodos: async (_: any, args: any) => {
      const newTodo: ITodo[] = await Todo.find();
      const users: IUser[] = await User.find();
      const todoWithUser = newTodo.map((todo: ITodo) => {
        return ({
          ...todo.toObject(),
          user: users.filter((user) => user.id === todo.userId)[0]
        })

      })
      // console.log(todoWithUser);
      return todoWithUser;
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