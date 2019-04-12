import { Document } from "mongoose";

export interface ITodo extends Document {
    id: string;
    title: string;
    isCompleted: boolean;
    authorId: string;
    createdAt: any;
}