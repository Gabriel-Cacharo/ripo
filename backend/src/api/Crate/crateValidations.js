const { z } = require('zod');

const getUserCratesValidation = z.object({ userId: z.string() }).strict();

module.exports = {
  getUserCratesValidation,
};
