import axios from 'axios';
import { IResolvers } from "graphql-tools";
import https from 'https';
import { IAccount, IContact } from "./contactInterface";
// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

const loginResolver: IResolvers = {
    Contact: {
        account: async (parent, args, {req }) => {
            const { accountId } = parent
            const { token } = req.session;
            try {
                const { data }: any = await axios.get(`${process.env.API_URI}/account/${accountId}`, {
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
    },
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
        },
        contacts: async (_: any, args: any, { req }) => {
            const { token } = req.session;
            try {
                const { data }: any = await axios.get(`${process.env.API_URI}/contacts`, {
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

export default loginResolver;
