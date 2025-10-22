import z from "zod";

export const userValidation = z.object({
  username: z
    .string("El username debe ser un string")
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(50, "El username debe tener al máximo 50 caracteres")
    .trim(),
  password: z
    .string()
    .min(3, "La contraseña debe tener al menos 3 caracteres")
    .max(50, "La contraseña debe tener al máxmo 50 caracteres")
    .trim(),
});

export const validateUser = (input) => {
  return userValidation.safeParse(input);
};

// patch
export const validatePartialUser = (input) => {
  return userValidation.partial().safeParse(input);
};