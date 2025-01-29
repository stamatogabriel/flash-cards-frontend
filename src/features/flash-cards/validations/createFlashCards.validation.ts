import { z } from 'zod';

export const createFlashCardsValidation = z.object({
  topic: z.string().nonempty("Informe o tema"),
  quantityCards: z.string().nonempty("Informe a quantidade de cards"),
})