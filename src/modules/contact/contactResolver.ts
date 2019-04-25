import axios from 'axios';
import { IResolvers } from "graphql-tools";
import https from 'https';
import { IAccount, IContact } from "./contactInterface";
// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

const loginResolver: IResolvers = {
    Query: {
        getContactById: async (_: any, args: any, { req }) => {
            const { id } = args;
            const { token } = req.session;
            try {
                const { data }: any = await axios.get(`${process.env.API_URI}/contact/${id}`, {
                    httpsAgent: agent,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                return data
            } catch (e) {
                console.log(e)
                return 
            }
        }
    }
};

export default loginResolver;
