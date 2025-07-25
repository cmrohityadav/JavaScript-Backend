console.log("Hello GraphQL")
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

async function startServer(){
    const server=new ApolloServer({
        typeDefs,
        resolvers
    })

    const {url}=await startStandaloneServer(server,{
        listen:{port:4000}
    })

    console.log(`Server ready at :${url}`)
}

startServer()