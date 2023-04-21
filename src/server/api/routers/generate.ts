import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ctx, input}) => {
      console.log("we are here", input.prompt)

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: { // verify user has enough credits
            gte: 1,
          }
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      })

      // not enough credits
      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        })
      }

      // enough credits
      // TODO: generate icon

      return {
        message: "success",
      }
    })
})
