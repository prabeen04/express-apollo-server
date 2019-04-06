const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: {
      id: 1,
      name: 'J.K. Rowling'
    }
  },
  {
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
    }
  },
  // Author: {
  //   userName(_: void, args: void): string {
  //     return `👋 Hello Prabeen! 👋`;
  //   },
  // },
};
export default resolver;