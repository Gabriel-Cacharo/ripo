const { z } = require('zod');

const registerValidation = z.object({ username: z.string(), password: z.string(), email: z.string() }).strict();

const loginValidation = z.object({ email: z.string(), password: z.string() }).strict();

const searchProfileValidation = z.object({ username: z.string() }).strict();

const updateUserFacRipos = z.object({ facRipos: z.array(z.string()), facName: z.string().optional() });

const getPublicRipoOwnerValidation = z.object({ ripoId: z.string() }).strict();

const resetPasswordValidation = z.object({ newPassword: z.string(), oldPassword: z.string() }).strict();

const forgotPasswordValidation = z.object({ email: z.string() }).strict();

const acceptForgotPasswordValidation = z.object({ token: z.string(), newPassword: z.string() }).strict();

const editBasicUserInformationsValidation = z
  .object({
    userId: z.number(),
    xp: z.string().nullable(),
    coins: z.string().nullable(),
    instagram: z.string().nullable(),
    twitch: z.string().nullable(),
  })
  .strict();

module.exports = {
  registerValidation,
  loginValidation,
  searchProfileValidation,
  updateUserFacRipos,
  getPublicRipoOwnerValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
  acceptForgotPasswordValidation,
  editBasicUserInformationsValidation,
};
