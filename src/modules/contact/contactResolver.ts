import axios from 'axios';
import { IResolvers } from "graphql-tools";
import https from 'https';

// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

const loginResolver: IResolvers = {
    Query: {
        getContactById: async (_: any, args: any, { req }) => {
            const { id } = args;
            try {
                const { data: { token } }: any = await axios.get(`${process.env.API_URI}/contact/${id}`, {
                    httpsAgent: agent
                })
                req.session.token = token
                return { status: true, token }
            } catch (e) {
                console.log(e)
                return { status: false }
            }
        }
    }
};

export default loginResolver;
