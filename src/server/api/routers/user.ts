import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findFirst({
        where: { id: input.id },
        include: {
          recipes: {
            include: {
              steps: {
                include: {
                  ingredients: true,
                },
              },
              reviews: {
                include: {
                  author: true,
                },
              },
              labels: true,
            },
          },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
