import { IResolvers } from 'graphql-tools';
import { getStoryById, stories, addStory } from "./resolvers/storyResolver";
import { addTodo, getTodos, updateTodo, deleteTodo } from "./resolvers/todoResolver";

//resolver for graphql queries and mutations
const resolver: IResolvers = {
  /**
   * define resolver for all type of data query
   * its where you decide what to return when a query is fired
   */
  Query: {
    stories,
    getStoryById,
    getTodos
  },
  /**
 * define resolver for all type of mutaion
 * its where you add data to wherever you want
 */
  Mutation: {
    addStory,
    addTodo,
    updateTodo,
    deleteTodo
  },
};
export default resolver;