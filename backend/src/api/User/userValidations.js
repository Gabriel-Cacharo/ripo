const { z } = require('zod');

const registerValidation = z.object({ username: z.string(), password: z.string(), email: z.string() }).strict();

const loginValidation = z.object({ email: z.string(), password: z.string() }).strict();

const searchProfileValidation = z.object({ username: z.string() }).strict();

const updateUserFacRipos = z.object({ facRipos: z.array(z.string()) });

module.exports = {
  registerValidation,
  loginValidation,
  searchProfileValidation,
  updateUserFacRipos,
};
