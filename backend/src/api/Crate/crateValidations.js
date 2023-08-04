const { z } = require('zod');

const buyCrateValidation = z.object({ crateId: z.string() }).strict();

const removeUserCrateValidation = z.object({ userId: z.number(), crateId: z.number() }).strict();

module.exports = {
  buyCrateValidation,
  removeUserCrateValidation,
};
