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



// resolverMap.ts
import { IResolvers } from 'graphql-tools';
const resolver: IResolvers = {
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
};
export default resolver;