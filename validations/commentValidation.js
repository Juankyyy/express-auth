import z from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const commentValidation = z.object({
  postId: objectId,
  userId: objectId,
  content: z.string().min(1).max(200),
  images: z.array(z.string().optional().default([])).default([]),
  likes: z.array(objectId).optional().default([]),
  likesCount: z.number().min(0).optional().default(0),
  repost: z.array(objectId).optional().default([]),
  repostCount: z.number().min(0).optional().default(0),
});

export const validateComment = (input) => {
  return commentValidation.safeParse(input);
};

export const validateCreateComment = (input) => {
  const commentCreateValidation = commentValidation.omit({
    likes: true,
    likesCount: true,
    repost: true,
    repostCount: true,
  });

  return commentCreateValidation.safeParse(input);
};

export const validatePartialComment = (input) => {
  return commentValidation.partial().safeParse(input);
}
