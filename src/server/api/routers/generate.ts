import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// DALL-E API (OpenAI)
import { env } from "~/env.mjs";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ctx, input}) => {
      console.log("we are here", input.prompt)

      // verify user has enough credits
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          }
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      })

      // (1) not enough credits (throw error)
      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        })
      }

      // (2) enough credits (generate icon (fetch request to DALLE API))
      let url = null
      try {
        const response = await openai.createImage({
          prompt: input.prompt,
          n: 1,
          size: "1024x1024",
        });
        url = response.data.data[0]?.url
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Error generating icon. (${error})`,
        })
      }
      

      return {
        message: "success",
        imageUrl: url,
      }
    })
})
