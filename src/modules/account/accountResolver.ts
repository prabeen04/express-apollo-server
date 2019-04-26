import axios from 'axios';
import { IResolvers } from "graphql-tools";
import https from 'https';
import { IAccount } from "./accountInterface";
// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

const accountResolver: IResolvers = {
    Query: {
        accounts: async (_: any, args: any, { req }) => {
            const { token } = req.session;
            try {
                const { data }: any = await axios.get(`${process.env.API_URI}/accounts`, {
                    httpsAgent: agent,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                console.log(data)
                return data
            } catch (e) {
                console.log(e)
                return 
            }
        },
    }
};

export default accountResolver;
