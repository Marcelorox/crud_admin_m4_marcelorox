import { z } from "zod";

const validateRegisterUser = z.object({
  name: z.string().max(50).nonempty(),
  email: z.string().email().max(50).nonempty(),
  password: z.string().max(120).nonempty(),
  admin: z.boolean().default(false),
});

const validateLogin = z.object({
  email: z.string().max(50).nonempty(),
  password: z.string().max(120).nonempty(),
});

const validateRegisterUserReturn = validateRegisterUser
  .extend({
    id: z.number(),
  })
  .omit({ password: true });

const validateGetUsers = validateRegisterUserReturn.array();
export {
  validateLogin,
  validateRegisterUser,
  validateRegisterUserReturn,
  validateGetUsers,
};
