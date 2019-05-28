import { Document } from "mongoose";
export default interface IStory extends Document {
    id: string;
    title: string;
    article: string;
    authorId: string;
    createdAt: any;
}