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
      console.log(username, password)
      // const response = await axios.post(`${process.env.LOGIN_URI}/token/generate-token`, { username: email, password })
      axios.post(`https://fokuswork.com:8443/salesxl/token/generate-token`, { username, password }, {
        httpsAgent: agent
      })
        // axios.post('https://jsonplaceholder.typicode.com/users')
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // console.log(response)
      // return {
      //   status: true,
      //   token
      // }
    }
  }
};

export default loginResolver;
