import { z } from "zod";

export const userValidation = z.object({
  username: z.string().nonempty('Informe o nome completo'),
  email: z.string().nonempty('Informe seu e-mail').email('Informe um e-mail válido'),
  // type: z.string().nonempty('Informe o tipo de usuário'),
  phone: z.string().optional(),
  password: z.string().optional(),
});