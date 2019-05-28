import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import User from "../../../models/UserSchema";

const registerResolver: IResolvers = {
  Query: {
    hi: () => "hi there!",
    users: async (parent: any, args: any) => {
      const users = await User.find();
      console.log(users)
      return users
    }
  },
  Mutation: {
    register: async (_: any, args: any) => {
      const { userName, email, password } = args;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword
      });
      return omit(newUser.toObject(), "password");
    }
  }
};

export default registerResolver;
