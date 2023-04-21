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
      const base64EncodedImage = await generateIcon(input.prompt)

      // (3) save imageUrl (if from DALL-E API) to file management service (AWS S3)
      // TODO

      return {
        message: "success",
        imageUrl: base64EncodedImage,
      }
    })
})






// FUNCTIONS
async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_OPENAI == "true") {
    return "https://picsum.photos/400/400"
  } else {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    });
    const base64EncodedImage = response.data.data[0]?.b64_json
    return base64EncodedImage
}
}
