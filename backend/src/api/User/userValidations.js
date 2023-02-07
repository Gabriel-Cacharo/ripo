const { z } = require('zod');

const registerValidation = z.object({ username: z.string(), password: z.string(), email: z.string() }).strict();

const loginValidation = z.object({ email: z.string(), password: z.string() }).strict();

module.exports = {
  registerValidation,
  loginValidation,
};
