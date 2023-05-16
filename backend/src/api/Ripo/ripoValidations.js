const { z } = require('zod');

const createUserRipoValidation = z
  .object({ ripoUrl: z.string(), ripoName: z.string(), twitch: z.string(), instagram: z.string() })
  .strict();

const removeUserRipoValidation = z.object({ userId: z.number(), ripoId: z.number() }).strict();

const addUserRiposValidation = z.object({ userId: z.number(), riposId: z.array(z.string()) });

const editRipoBasicInformationsValidation = z
  .object({
    ripoId: z.number(),
    name: z.string(),
    price: z.string(),
    rarity: z.number(),
    public: z.boolean(),
    ripoImage: z.string(),
  })
  .strict();

module.exports = {
  createUserRipoValidation,
  removeUserRipoValidation,
  addUserRiposValidation,
  editRipoBasicInformationsValidation,
};
