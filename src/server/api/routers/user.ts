import { TRPCError } from "@trpc/server";
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
  getCredits: protectedProcedure
    .query(async ({ctx}) => {
      const credits = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        select: {
          credits: true
        }
      })
    return credits
    })
})