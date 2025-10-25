import z from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const postValidation = z.object({
  userId: objectId,
  description: z.string().min(1).max(200),
  images: z.array(z.string().optional().default([])),
  likes: z.array(objectId).optional().default([]),
  comments: z.array(objectId).optional().default([]),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const validatePost = (input) => {
  return postValidation.safeParse(input);
};