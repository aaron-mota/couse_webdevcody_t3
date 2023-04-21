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
      const imageUrl = await generateIcon(input.prompt)

      return {
        message: "success",
        imageUrl: imageUrl,
      }
    })
})






// FUNCTIONS
async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_OPENAI == "true") {
    const stylisticCatwomanFigurine = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-2Xbw5RQbtxKszg7U1mXu8YMO.png?st=2023-04-21T03%3A34%3A10Z&se=2023-04-21T05%3A34%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T22%3A58%3A57Z&ske=2023-04-21T22%3A58%3A57Z&sks=b&skv=2021-08-06&sig=9rH8e6j9LjmODl5Ig9IMB6euyGbSmLUDs7LOU01dUVw%3D"
    const campyPopArtCatwoman = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-aXphFEHdVWVZ192PE4ZFgNj9.png?st=2023-04-21T03:43:39Z&se=2023-04-21T05:43:39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-21T04:28:05Z&ske=2023-04-22T04:28:05Z&sks=b&skv=2021-08-06&sig=/pbUKK4Pv4qQgr8w4j/9bz0pPvnDyGnzouYTEUni5to="
    const campyGraphicCatwoman = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-6ZS0dyIasQw1KD3fROoQk9OL.png?st=2023-04-21T03%3A42%3A15Z&se=2023-04-21T05%3A42%3A15Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-21T00%3A20%3A33Z&ske=2023-04-22T00%3A20%3A33Z&sks=b&skv=2021-08-06&sig=MiuAj/4iyq2QEsPyigm7/azYlVV/vBWjq9QLRl%2Bj97E%3D"
    const campyPokemonCatwoman = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-v9C9fTRLsPelqfrEp7ZwayDW.png?st=2023-04-21T03%3A49%3A08Z&se=2023-04-21T05%3A49%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T23%3A48%3A15Z&ske=2023-04-21T23%3A48%3A15Z&sks=b&skv=2021-08-06&sig=bFSlDwPR1%2B/Y66lkoUV8JF/6t0r%2BL5NZeCFphfO43M8%3D"
    const campyPowerpuffCatwoman = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-ppOX9b5u8wB6po6yyj436EgW.png?st=2023-04-21T03%3A56%3A05Z&se=2023-04-21T05%3A56%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-21T04%3A47%3A58Z&ske=2023-04-22T04%3A47%3A58Z&sks=b&skv=2021-08-06&sig=pXLEYVR7%2BkvNBkp/3bvRJAn8%2BbRGW3FCSmsGtjhKE44%3D"
    const imageUrls = [campyPopArtCatwoman, campyGraphicCatwoman, campyPokemonCatwoman, campyPowerpuffCatwoman]
    // select random image
    const randomIndex = Math.floor(Math.random() * imageUrls.length)
    const imageUrl = imageUrls[randomIndex]
    return imageUrl
  } else {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data.data[0]?.url
    return imageUrl
}
}
