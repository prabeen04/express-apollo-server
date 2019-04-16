import { IResolvers } from "graphql-tools";
import StorySchema from "../../models/StorySchema";
import IStory from "../../models/Interface/StoryInterface";

const storyResolver: IResolvers = {
  Query: {
    stories: async (_: any, args: any) => {
      const stories = await StorySchema.find();
      return stories;
    },
    getStoryById: async (_: any, args: any) => {
      const story: any = await StorySchema.findOne({ _id: args._id });
      return story;
    }
  },
  Mutation: {
    addStory: async (_: any, args: IStory) => {
      const { title, article, authorId, createdAt } = args;
      const newStory = await StorySchema.create({
        title,
        article,
        authorId,
        createdAt
      });
      return newStory.toObject();
    }
  }
};

export default storyResolver;
