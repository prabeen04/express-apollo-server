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
      console.log(stories)
      return stories;
    },
    getStoryById: async (_: any, args: any, { req }) => {
      console.log(req.session.token)
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
      console.log(newStory)
      console.log(newStory.toObject())
      const output = { ...newStory.toObject(), id: newStory._id }
      console.log(output)
      return output;
    },
    updateStory: async (_: any, args: IStory) => {

    },
    deleteStory: async (_: any, args: any) => {
      const { id } = args;
      const deletedStory = await Story.findByIdAndDelete({ _id: id })
      console.log(deletedStory)
      return deletedStory
    }
  }
};

export default storyResolver;
