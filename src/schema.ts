import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

const typeDefs = `
type User {
    email: String!
    name: String
    role: String
  }
  type Reservation {
    createdAt: DateTime
    reservationStart: DateTime
    reservationEnd: DateTime
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

scalar DateTime
`

const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany()
    },
    allReservations: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.reservation.findMany({    })
    },
    allRooms: (_parent, args: { id: number }, context: Context) => {
        return context.prisma.room.findMany({
          where: { id: args.id || undefined },
        })
      },
    }
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

interface PostOrderByUpdatedAtInput {
  updatedAt: SortOrder
}

interface UserUniqueInput {
  id?: number
  email?: string
}

interface PostCreateInput {
  title: string
  content?: string
}

interface UserCreateInput {
  email: string
  name?: string
  posts?: PostCreateInput[]
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
