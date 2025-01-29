import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().nonempty('Informe sua senha.'),
});