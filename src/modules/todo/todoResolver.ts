import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";
import IUser from "../../models/Interface/UserInterface";
import User from '../../models/UserSchema'

const todoResolver: IResolvers = {
  Query: {
    getTodos: async (_: any, args: any) => {
      const newTodo: ITodo[] = await Todo.find();
      const users: IUser[] = await User.find();
      const todoWithUser: any = newTodo.map((todo: ITodo) => {
        return ({
          ...todo.toObject(),
          user: omit(users.filter((user: IUser) => user.id === todo.userId)[0].toObject(), 'password')
        })

      })
      console.log(todoWithUser)
      return todoWithUser;
    },
    user: async (_: any, args: any) => {
      const { id } = args;
      const user = User.findById({ id })
      console.log(user);

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