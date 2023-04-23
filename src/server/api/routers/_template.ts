// import { TRPCError } from "@trpc/server";
// import { z } from "zod";

// import {
//   createTRPCRouter,
//   publicProcedure,
//   protectedProcedure,
// } from "~/server/api/trpc";



// export const templateRouter = createTRPCRouter({
//   templateProcedure: publicProcedure
//     .input(
//       z.object({
//         prompt: z.string(),
//       })
//     )
//     .mutation(async ({ctx, input}) => {
//     })
// })