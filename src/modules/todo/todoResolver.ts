import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import ITodo from "../../models/Interface/TodoInterface";
import Todo from "../../models/TodoSchema";
import IUser from "../../models/Interface/UserInterface";
import User from '../../models/UserSchema'

const todoResolver: IResolvers = {
  User: {
    user: async parent => {
      const user: any = await User.findById({ id: parent.id });
      console.log(user)
    }
  },
  Query: {
    getTodos: async (_: any, args: any) => {
      const newTodo: ITodo[] = await Todo.find();
      const todoWithUser: any = newTodo.map((todo: ITodo) => {
        return ({
          ...todo.toObject(),
          // user: omit(users.filter((user: IUser) => user.id === todo.userId)[0].toObject(), 'password')
        })

      })
      console.log(todoWithUser)
      return todoWithUser;
    },
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