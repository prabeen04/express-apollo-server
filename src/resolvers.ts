import { IResolvers } from 'graphql-tools';
import bcryptjs from 'bcryptjs'
import { omit } from "lodash";
import User from './models/UserSchema';
import IUser from "./models/Interface/UserInterface";
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: {
      id: 1,
      name: 'J.K. Rowling'
    }
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: {
      id: 2,
      name: 'Michael Crichton'
    },
  },
];

//resolver for graphql queries and mutations
const resolver: IResolvers = {
  /**
   * define resolver for all type of data query
   * its where you decide what to return when a query is fired
   */
  Query: {
    user(_: void, args: any): any {
      return {
        id: `👋 Hello world! 👋`,
        userName: `prabeen👋`,
        email: 'example@example.com'
      }
    },
    author(_: void, args: any): any {
      return {
        id: `👋 Hello world! 👋`,
        name: `prabeen👋`
      }
    },
    books(_: any, args: any): any {
      return books
    },
    getBookById(_: any, args: any): any {
      console.log(args)
      return books.filter((book: any) => book.id === args.id)[0]
    },
  },
  /**
 * define resolver for all type of mutaion
 * its where you add data to wherever you want
 */
  Mutation: {
    async addUser(_: any, args: IUser) {
      const { userName, email, password } = args;
      const hashedPassword = await bcryptjs.hash(password, 10)
      const newUser = await User.create({ userName, email, password: hashedPassword })
      return omit(newUser.toObject(), 'password')
    },
    async addBook(_: void, args: any) {
      const newBook = {
        title: args.title,
        id: books.length + 1,
        author: {
          id: 1,
          name: 'J.K. Rowling'
        }
      }
      books.push(newBook)
      return newBook;
    },
  },
};
export default resolver;