import { DateTimeResolver } from 'graphql-scalars'
const { GraphQLDate } = require('graphql-iso-date')
const scalarResolvers = {
  Date: GraphQLDate
}
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLList, } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Task from './types/task';
import Reservation from './types/Reservation';

const prisma = new PrismaClient();
const typeDefs = `

  type User {
    email: String!
    name: String
    role: String
  }
  type Reservation {
    createdAt: Date! 
    reservationStart: Date!
    reservationEnd: Date!
    guestId: Int
    roomId: Int
  }
  type Room {
    roomNumber: Int
    hasOceanView: Boolean 
    pricePerNight: Float
    hasBathroom: Boolean  
    numberOfAdultBeds: Int 
    maxOccupancy: Int 
    hasAircondition: Boolean  
    hasMinibar: Boolean 
  }

  type Query {

    allUsers: [User!]!
    allRooms: [Room!]!
    allReservations: [Reservation!]!

  }
`;

const resolvers = {
  Date:GraphQLDate,
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    allReservations: () => {
      return prisma.reservation.findMany();
    },
    allRooms: () => {
      return prisma.room.findMany();
    }
  }
};

export const schema = makeExecutableSchema({
  scalarResolvers,
  resolvers,
  typeDefs,
});
  
// const QueryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     taskMainList: {
//       type: new GraphQLList(new GraphQLNonNull(Task)),
//       resolve: async (source, args, { pgApi }) => {
//         return await pgApi.taskMainList();
//       },
//     },
//     reservationMainList:{
//       type: new GraphQLList(new GraphQLNonNull(Reservation)),
//       resolve: async (source, args, { pgApi }) => {
//         return await pgApi.reservationMainList();
        
//     },
//   },
// }
// });

// export const schema = new GraphQLSchema({
//   query: QueryType,
// });

console.log(printSchema(schema));