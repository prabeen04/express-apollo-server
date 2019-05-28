import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";
import IUser from "../../models/Interface/UserInterface";
import User from '../../models/UserSchema'

const todoResolver: IResolvers = {
  Todo: {
    user: async (parent: ITodo) => {
      const newUser: IUser | any = await User.findOne({ _id: parent.toObject().userId })
      return newUser.toObject()
    }
  },
  Query: {
    getTodos: async (_: any, args: any) => {
      const newTodo: ITodo[] = await Todo.find();
      return newTodo;
    },
  },
  Mutation: {
    addTodo: async (_: any, args: any) => {
      const newTodo: ITodo = await Todo.create(args);
      return newTodo.toObject();
    },
    updateTodo: async (_: any, args: any) => {
      const { id, ...patches } = args;
      const updateTodo: any = await Todo.findByIdAndUpdate(id, {
        $set: { ...patches }
      });
      return { ...updateTodo, ...patches };
    },
    deleteTodo: async (_: any, args: { id: string }) => {
      const { id } = args;
      const isDeleted: any = await Todo.findByIdAndDelete(id);
      return isDeleted;
    }
  }
};

export default todoResolver;