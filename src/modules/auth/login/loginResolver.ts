import { IResolvers } from "graphql-tools";
import { omit } from "lodash";
import * as bcryptjs from "bcryptjs";

import * as jwt from 'jsonwebtoken';
import User from "../../../models/UserSchema";

declare var process: {
  env: {
    CLIENT_SECRET: string
    LOGIN_URI: string
    API_URI: string
  }
}

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
      const { email, password } = args;
      const response = await fetch(`${process.env.LOGIN_URI}/token/generate-token`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      console.log(data)
      // return {
      //   status: true,
      //   token
      // }
    }
  }
};

export default loginResolver;
