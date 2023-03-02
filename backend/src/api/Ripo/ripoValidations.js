const { z } = require('zod');

const createUserRipoValidation = z.object({ ripoUrl: z.string(), ripoName: z.string() }).strict();

module.exports = {
  createUserRipoValidation,
};
