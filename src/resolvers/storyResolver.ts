import Story from "../models/StorySchema";
import IStory from '../models/Interface/StoryInterface'

export const getStoryById: any = async (_: any, args: any) => {
    const story: any = await Story.findOne({ _id: args._id })
    return story
}
