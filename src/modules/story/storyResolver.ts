import { IResolvers } from "graphql-tools";
import Story from "../../models/StorySchema";
import IStory from "../../models/Interface/StoryInterface";
import User from "../../models/UserSchema";
import IUser from '../../models/Interface/UserInterface'
const storyResolver: IResolvers = {
  Story: {
    user: async parent => {
      const newUser: IUser | any = await User.findById({ _id: parent.toObject().authorId })
      return newUser.toObject()
    }
  },
  Query: {
    stories: async (_: any, args: any) => {
      const stories = await Story.find();
      return stories;
    },
    getStoryById: async (_: any, args: any, { req }) => {
      const story: any = await Story.findOne({ _id: args.id });
      return story;
    }
  },
  Mutation: {
    addStory: async (_: any, args: IStory) => {
      const { title, article, authorId, createdAt } = args;
      const newStory = await Story.create({
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
