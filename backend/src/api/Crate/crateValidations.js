const { z } = require('zod');

const buyCrateValidation = z.object({ crateId: z.string() }).strict();

const removeUserCrateValidation = z.object({ userId: z.number(), crateId: z.number() }).strict();

const editCrateBasicInformationsValidation = z
  .object({
    crateId: z.number(),
    name: z.string(),
    rarity: z.number(),
    price: z.string(),
    crateImage: z.string(),
    type: z.string(),
  })
  .strict();

const editCrateDropsValidation = z
  .object({
    id: z.number(),
    canDropItems: z.boolean(),
    canDropRipo: z.boolean(),
    itemsDrop: z.string().nullish(),
    riposDrop: z.string().nullish(),
  })
  .strict();

module.exports = {
  buyCrateValidation,
  removeUserCrateValidation,
  editCrateBasicInformationsValidation,
  editCrateDropsValidation,
};
