import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import User from "../../../models/UserSchema";

const userResolver: IResolvers = {
  Query: {
    hi: () =>({ id: "hi there!"})
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
