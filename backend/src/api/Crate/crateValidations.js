const { z } = require('zod');

const buyCrateValidation = z.object({ crateId: z.string() }).strict();

module.exports = {
  buyCrateValidation,
};
