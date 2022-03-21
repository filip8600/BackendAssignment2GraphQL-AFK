import { DateTimeResolver } from 'graphql-scalars'
// const { GraphQLDate } = require('graphql-iso-date')
// const scalarResolvers = {
//   Date: GraphQLDate
// }
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
scalar DateTime
  type User {
    email: String!
    name: String
    role: String
  }
  type Reservation {
    createdAt: DateTime! 
    reservationStart: DateTime!
    reservationEnd: DateTime!
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
  type Mutation {
    createReservation(data: ReservationInput): Reservation!
    createRoom(data: RoomInput): Room!
    signupUser(data: UserInput): User!
  }
  input UserInput{
    email: String!
    name: String
    role: String
  }
  input RoomInput {
    roomNumber: Int
    hasOceanView: Boolean 
    pricePerNight: Float
    hasBathroom: Boolean  
    numberOfAdultBeds: Int 
    maxOccupancy: Int 
    hasAircondition: Boolean  
    hasMinibar: Boolean 
  }
  input ReservationInput {
    reservationStart: DateTime!
    reservationEnd: DateTime!
    guestId: Int
    roomId: Int
  }
  
`;

const resolvers = {
  DateTime: DateTimeResolver,
  // Date:GraphQLDate,
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
  },
  Mutation:{
    /**
     * @param {any} _parent
     * @param {{data: {email: string, name?: string}}} args
     * @param {{ prisma: Prisma }} context
     */
     signupUser: (_parent, args) => {
           return prisma.user.create({
        data: {
          
          email: args.data.email,
          name: args.data.name,
          role: args.data.role,
         
        },
      })
    },
    createRoom:(_parrent,args)=>{
      return prisma.room.create({
        data: args.data
      })
    },
    createReservation:async(_parrent,args)=> {
      let otherReservations= await prisma.reservation.findMany({
        where:{
          roomId : args.data.roomId,
        reservationStart:{
          gt:args.data.reservationStart},
        reservationEnd:{
          lt:args.data.reservationEnd}
      }
    })
    if(otherReservations.length>0) return "ERROR :("
    return prisma.reservation.create({data: args.data})
    }

  }
};

export const schema = makeExecutableSchema({
  //scalarResolvers,
  resolvers,
  typeDefs,
});
  


console.log(printSchema(schema));