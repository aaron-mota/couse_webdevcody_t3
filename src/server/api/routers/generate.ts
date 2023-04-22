import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


// DALL-E API (OpenAI)
import { env } from "~/env.mjs";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// S3 API (AWS S3)
import AWS from "aws-sdk"
const s3 = new AWS.S3({
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  region: env.S3_REGION,
})



export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ctx, input}) => {
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
      // const finalPrompt = `a modern icon of ${input.prompt}, 3d rendered, metallic material, shiny, minimalist`
      const finalPrompt = input.prompt
      const base64EncodedImage = await generateIcon(finalPrompt)

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      })

      // (3) if DALL-E image (vs mock), save image to file management service (AWS S3)
      if (!isMockImage(base64EncodedImage)) {
        try {
          const putObject = {
            Bucket: env.S3_BUCKET_NAME,
            Body: Buffer.from(base64EncodedImage!, 'base64'),
            Key: icon.id,
            ContentEncoding: 'base64',
            ContentType: 'image/png',
          }
          // console.log(putObject)
          await s3.putObject(putObject)
          .promise()
        } catch(error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error saving image to file management service",
          })
        }
      }

      // http://course-webdevcody-t3-2.s3-website.us-east-2.amazonaws.com
      const imageUrl = base64EncodedImage?.slice(0,4) === "http" ? base64EncodedImage : `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${icon.id}`
      return {
        imageUrl,
      }
    })
})






// FUNCTIONS
function isMockImage(image: string | undefined): boolean {
  return image?.slice(0,4) === "http"
}

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_OPENAI == "true") {
    return "https://picsum.photos/400/400"
  } else {
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
        response_format: "b64_json"
      });
      const base64EncodedImage = response.data.data[0]?.b64_json
      return base64EncodedImage
    } catch(error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error generating image",
      })
    }
}
}
