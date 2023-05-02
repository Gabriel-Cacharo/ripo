const { z } = require('zod');

const createUserRipoValidation = z
  .object({ ripoUrl: z.string(), ripoName: z.string(), twitch: z.string(), instagram: z.string() })
  .strict();

const removeUserRipoValidation = z.object({ userId: z.number(), ripoId: z.number() }).strict();

const addUserRiposValidation = z.object({ userId: z.number(), riposId: z.array(z.string()) });

module.exports = {
  createUserRipoValidation,
  removeUserRipoValidation,
  addUserRiposValidation,
};
