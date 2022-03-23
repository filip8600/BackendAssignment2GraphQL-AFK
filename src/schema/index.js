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
    id: Int
    email: String!
    name: String
    role: String
  }
  type Reservation {
    id: Int
    createdAt: DateTime! 
    reservationStart: DateTime!
    reservationEnd: DateTime!
    guestId: Int
    roomId: Int
  }
  type Room {
    id: Int
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
    updateReservation(data: ReservationInput): Reservation!
    deleteReservation(data: Int): Reservation!
    createRoom(data: RoomInput): Room!
    updateRoom(data: RoomInput): Room!
    deleteRoom(data: Int): Room!
    signupUser(data: UserInput): User!
    updateUser(data: UserInput): User!
    deleteUser(data: Int): User!

  }
  input UserInput{
    id: Int
    email: String!
    name: String
    role: String
  }
  input RoomInput {
    id: Int
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
    id: Int
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
    /**USER
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
    updateUser: (_parent, args) =>{
      return prisma.user.update({data: args.data,
        where:{id:args.data.id}})
    },
    deleteUser: (_parent, args) =>{
      return prisma.user.delete({where:{id:args.data}})
    },
    createRoom:(_parrent,args)=>{
      return prisma.room.create({
        data: args.data
      })
    },
    updateRoom:(_parrent,args)=>{
      return prisma.room.update({
        data: args.data,
        where:{id:args.data.id}
      })
    },
    deleteRoom:(_parrent,args)=>{
      return prisma.room.delete({where:{id:args.data}})
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
    },
    updateReservation:(_parrent,args) => {
      return prisma.reservation.update({data: args.data,
      where:{id:args.data.id}})
    },
    deleteReservation:(_parrent,args) => {
      return prisma.reservation.delete({where:{id:args.data}})
    }

  }
};

export const schema = makeExecutableSchema({
  //scalarResolvers,
  resolvers,
  typeDefs,
});
  


console.log(printSchema(schema));