import z from "zod"

export const FirstAccessFormSchema = z.object({
  accountType: z.string().refine((value) => value !== '', {
    message: 'Selecione um tipo de conta.',
  }),
  memberArea: z.string().refine((value) => value !== '', {
    message: 'Selecione uma área de membros.',
  }),
  videoHosting: z.string().refine((value) => value !== '', {
    message: 'Selecione um hosting de vídeos.',
  }),
})

export type FirstAccessFormInputs = z.infer<typeof FirstAccessFormSchema>

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmNewPassword: z.string()
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não correspondem",
    path: ["confirmNewPassword"],
  })

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>

export const signUpSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Por favor, insira um endereço de e-mail válido'),
  phone: z.string().min(14, 'Por favor, insira um número de telefone válido'),
  document: z.string().min(14, 'Por favor, insira um número de documento válido'),
  password: z.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});


export type SignUpFormData = z.infer<typeof signUpSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Por favor, insira um endereço de e-mail válido'),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const verifyEmailSchema = z.object({
  code: z.string().length(6, 'O código deve ter 6 dígitos'),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export const createFolderSchema = z.object({
  folderName: z.string().min(1, 'Nome da pasta é obrigatório'),
  coverUrl: z
    .string()
    .optional()
    .refine(
      (url) =>
        !url || /^https?:\/\/.+\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(url),
      {
        message:
          'A URL deve ser válida e terminar com uma extensão de imagem (jpeg, jpg, png, gif, bmp, webp, svg)',
      },
    ),
  videoIds: z.array(z.string()).optional(),
});

export type CreateFolderFormValues = z.infer<typeof createFolderSchema>;

export const videoSchema = z.object({
  name: z.string().min(1, 'Nome do vídeo é obrigatório'),
  url: z.string().url('URL inválida'),
  duration: z.string({
    required_error: "Duração do vídeo é obrigatória",
  }),
  folderId: z.string().optional(),
  type: z.enum(['Vsl', 'Curso'], {
    errorMap: (issue, ctx) => ({ message: 'Informe o tipo de vídeo.' })
  }),
  format: z.enum(['9/16', '16/9'], {
    errorMap: (issue, ctx) => ({ message: 'Informe o formato.' })
  }),
  fictitiousProgress: z.boolean().optional(),
  color: z.string().optional(),
  chapters: z.array(
    z.object({
      title: z.string().min(1, 'Título obrigatório'),
      startTime: z.string({
        required_error: "Inicio do capitulo é obrigatória",
      }),
      endTime: z.string({
        required_error: "Fim do capitulo é obrigatória",
      }),
    })
  ).optional(),
});

export type VideoFormValues = z.infer<typeof videoSchema>;