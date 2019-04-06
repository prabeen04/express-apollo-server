import mongoose, { Schema, Document } from 'mongoose';
import IUser, { IUser } from './Interface/UserInterface';

const userSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export default mongoose.model<IUser>('user', userSchema)