import Story from "../models/StorySchema";
import IStory from '../models/Interface/StoryInterface'

export const getStoryById: any = async (_: any, args: any) => {
    const story: any = await Story.findOne({ _id: args._id })
    return story
}
export const stories: any = async (_: any, args: any) => {
    const stories = await Story.find()
    return stories;
}
export const addStory: any = async (_: any, args: IStory) => {
    const { title, article, authorId, createdAt } = args;
    const newStory = await Story.create({ title, article, authorId, createdAt });
    return newStory.toObject()
}

