import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import User from "../../../models/UserSchema";

const loginResolver: IResolvers = {
  Mutation: {
    login: async (_: any, args: any) => {
        const { email, password } = args;
        const user: any = await User.findOne({ email })
        if(!user) return false
        const match = await bcryptjs.compare(password, user.password)
        return match ? true : false
    }
  }
};

export default loginResolver;
