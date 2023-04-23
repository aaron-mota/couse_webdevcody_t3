// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .query(async ({ctx}) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
      })
    return user
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ctx, input}) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId
        }
      })
      return user
    }),
  getCredits: protectedProcedure
    .query(async ({ctx}) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        select: {
          credits: true
        }
      })
    return user?.credits
    })
})