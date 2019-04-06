import { IResolvers } from 'graphql-tools';
import bcryptjs from 'bcryptjs'
import { omit } from "lodash";
import User from './models/UserSchema';
import IUser from "./models/Interface/UserInterface";
import Story from './models/StorySchema';
import IStory from './models/Interface/StoryInterface';

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
    async stories(_: any, args: any) {
      const stories = await Story.find()
      console.log('+_+_+', stories)
      return books
    },
    async getStoryById(_: any, args: any) {
      const story = await Story.findOne({ _id: args._id })
      console.log('+_+_+', story)
      return story
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
    async addStory(_: any, args: IStory) {
      const { title, article, authorId, createdAt } = args;
      const newStory = await Story.create({ title, article, authorId, createdAt });
      console.log(newStory)
      return newStory.toObject()
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