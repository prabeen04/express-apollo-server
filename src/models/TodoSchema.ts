import mongoose, { Schema } from 'mongoose';
import ITodo from './Interface/TodoInterface';

const todoSchema: Schema = new Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: String, required: true },
})

export default mongoose.model<ITodo>('Todo', todoSchema)