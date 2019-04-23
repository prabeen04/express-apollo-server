import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import User from "../../../models/UserSchema";

const loginResolver: IResolvers = {
  Mutation: {
    login: async (_: any, args: any) => {
      const { email, password } = args;
      const user: any = await User.findOne({ email })
      if (!user) return false
      const match = await bcryptjs.compare(password, user.password)
      console.log(match)
      const token = jwt.sign(user.toObject(), 'process.env.CLIENT_SECRET')
      console.log(token)
      if (!match) return false
      return true
    }
  }
};

export default loginResolver;
