import z from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const postValidation = z.object({
  userId: objectId,
  description: z.string().min(1).max(200),
  images: z.array(z.string().optional().default([])).default([]),
  likes: z.array(objectId).optional().default([]),
  likesCount: z.number().min(0).optional().default(0),
  repost: z.array(objectId).optional().default([]),
  repostCount: z.number().min(0).optional().default(0),
  comments: z.array(objectId).optional().default([]).default([]),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const validatePost = (input) => {
  return postValidation.safeParse(input);
};

export const validateCreatePost = (input) => {
  const postCreationValidation = postValidation.omit({
    likes: true,
    likesCount: true,
    repost: true,
    repostCount: true,
    comments: true,
  });

  return postCreationValidation.safeParse(input);
};

export const validatePartialPost = (input) => {
  return postValidation.partial().safeParse(input);
};
