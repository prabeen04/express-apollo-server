import { IResolvers } from 'graphql-tools';
import { getStoryById, stories, addStory } from "./resolvers/storyResolver";
import { addUser, users } from "./resolvers/userResolver";
import { addTodo, getTodos, updateTodo } from "./resolvers/todoResolver";

//resolver for graphql queries and mutations
const resolver: IResolvers = {
  /**
   * define resolver for all type of data query
   * its where you decide what to return when a query is fired
   */
  Query: {
    users,
    stories,
    getStoryById,
    getTodos
  },
  /**
 * define resolver for all type of mutaion
 * its where you add data to wherever you want
 */
  Mutation: {
    addUser,
    addStory,
    addTodo,
    updateTodo
  },
};
export default resolver;