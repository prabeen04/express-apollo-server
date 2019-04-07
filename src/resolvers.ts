import { IResolvers } from 'graphql-tools';
import bcryptjs from 'bcryptjs'
import { omit } from "lodash";
import User from './models/UserSchema';
import IUser from "./models/Interface/UserInterface";
import Story from './models/StorySchema';
import IStory from './models/Interface/StoryInterface';
import { getStoryById, stories, addStory } from "./resolvers/storyResolver";
//resolver for graphql queries and mutations
const resolver: IResolvers = {
  /**
   * define resolver for all type of data query
   * its where you decide what to return when a query is fired
   */
  Query: {
    async users(_: any, args: any) {
      const users = await User.find()
      return users;
    },
    stories,
    getStoryById
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
    addStory,
  },
};
export default resolver;