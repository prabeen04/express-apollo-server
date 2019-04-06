import { Document } from "mongoose";
export default interface IUser extends Document {
    id: string;
    userName: string;
    email: string;
    password: string;
}