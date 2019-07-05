import { IResolvers } from "graphql-tools";
import Story from "../../models/StorySchema";
import IStory from "../../models/Interface/StoryInterface";
import User from "../../models/UserSchema";
import IUser from '../../models/Interface/UserInterface'

const storyResolver: IResolvers = {
  Story: {
    user: async parent => {
      const newUser: IUser | any = await User.findById({ _id: parent.authorId })
      return newUser.toObject({ virtuals: true })
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
      const output = { ...newStory.toObject(), id: newStory._id }
      return output;
    },
    updateStory: async (_: any, args: IStory) => {
      const { id, ...patches } = args;
      const updateStory: any = await Story.findByIdAndUpdate(id, {
        $set: { ...patches }
      });
      console.log(updateStory);
      return { ...updateStory, ...patches };
    },
    deleteStory: async (_: any, args: any) => {
      const { id } = args;
      const deletedStory = await Story.findByIdAndDelete({ _id: id })
      return deletedStory
    }
  }
};

export default storyResolver;
