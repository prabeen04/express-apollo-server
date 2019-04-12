import { Document } from "mongoose";

export default interface ITodo extends Document {
    id: string;
    title: string;
    isCompleted: boolean;
    userId: string;
    createdAt: any;
}