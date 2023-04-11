const { z } = require('zod');

const createUserRipoValidation = z
  .object({ ripoUrl: z.string(), ripoName: z.string(), twitch: z.string(), instagram: z.string() })
  .strict();

module.exports = {
  createUserRipoValidation,
};
