import { GraphQLClient, gql, request } from 'graphql-request'


const endPoint = "http://localhost:4000/graphql"

export const graphqlClient = new GraphQLClient(endPoint, { headers: {} })