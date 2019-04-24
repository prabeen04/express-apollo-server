// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";
import axios from 'axios'
import * as jwt from 'jsonwebtoken';
import * as https from 'https';
import User from "../../../models/UserSchema";

declare var process: {
  env: {
    CLIENT_SECRET: string
    LOGIN_URI: string
    API_URI: string
  }
}

// At request level
const agent = new https.Agent({
  rejectUnauthorized: false
});

const loginResolver: IResolvers = {
  Mutation: {
    login: async (_: any, args: any) => {
      const { email, password } = args;
      const user: any = await User.findOne({ email })
      if (!user) return false
      const match = await bcryptjs.compare(password, user.password)
      console.log(match)
      const token = jwt.sign(omit(user.toObject(), 'password'), process.env['CLIENT_SECRET'])
      console.log(token)
      if (!match) return { status: false }
      return {
        status: true,
        token
      }
    },
    login2: async (_: any, args: any) => {
      const { username, password } = args;
      try {
        const response = await axios.post(`${process.env.LOGIN_URI}/token/generate-token`, { username, password }, { httpsAgent: agent })
        return { status: true, token: response.data.token }
      } catch (e) {
        console.log(e)
        return { status: false }
      }
    }
  }
};

export default loginResolver;
