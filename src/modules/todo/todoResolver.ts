import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";
import IUser from "../../models/Interface/UserInterface";
import User from '../../models/UserSchema'

const todoResolver: IResolvers = {
  Todo: {
    user: async (parent: ITodo) => {
      const newUser: any = await User.findOne({ id: parent.toObject().userId })
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
      console.log(newTodo.toObject());
      return newTodo.toObject();
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