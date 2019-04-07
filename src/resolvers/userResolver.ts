import bcryptjs from 'bcryptjs';
import { omit } from "lodash";
import User from '../models/UserSchema';
import IUser from '../models/Interface/UserInterface';

export const users = async (_: any, args: any) => {
    const users = await User.find()
    return users;
}

export const addUser: any = async (_: any, args: any) => {
    const { userName, email, password } = args;
    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = await User.create({ userName, email, password: hashedPassword })
    return omit(newUser.toObject(), 'password')
}
