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
  },
  // Author: {
  //   userName(_: void, args: void): string {
  //     return `👋 Hello Prabeen! 👋`;
  //   },
  // },
};
export default resolver;