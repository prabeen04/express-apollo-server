import mongoose, { Schema } from 'mongoose';
import IStory from './Interface/StoryInterface';

const storySchema: Schema = new Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    authorId: { type: String, required: true },
    createdAt: { type: String, required: true }
})

export default mongoose.model<IStory>('story', storySchema)