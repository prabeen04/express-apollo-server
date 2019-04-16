import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import User from "../../../models/UserSchema";

const registerResolver: IResolvers = {
  Mutation: {
    login: async (_: any, args: any) => {
        const { email, password } = args;
        const user: any = await User.findOne({ email })
        const match = await bcryptjs.compare(password, user.password)
        return match ? true : false
    }
  }
};

export default registerResolver;
