export const errorMessages: Record<string, string> = {
  'Unauthorized': 'Usuário sem permissão.',
  'Email verification not found or not verified.': 'Por favor, verifique sua conta e tente novamente.',
  'Código inválido ou email não encontrado.': 'Código inválido',
  'Invalid credentials.': 'Credenciais inválidas. Verifique seu e-mail e senha.',
  'Subscription not found.': 'Assinatura não encontrada. Por favor, entre em contato com o suporte.',
  'Late subscription.': 'Sua assinatura está pendente. Aguarde a confirmação.',
  'Subscription paused.': 'Sua assinatura foi pausada. Por favor, regularize sua situação.',
  'Subscription cancelled.': 'Sua assinatura foi cancelada. Por favor, entre em contato com o suporte.',
  'Email verification not found.': 'Seu e-mail não foi verificado. Verifique a caixa de entrada.',
  'E-mail already exists.': 'Esse e-mail já está sendo usado.',
  'User already exists.': 'Esse e-mail já está sendo usado.',
  'User not found': 'Usuário não encontrado.',
  default: 'Ocorreu um erro desconhecido. Tente novamente mais tarde.',
};

const dynamicErrorMessages: Record<string, (text: string) => string> = {
  'not found': (text) => `${text.charAt(0).toUpperCase() + text.slice(1)} não foi encontrado.`,
};

export const getErrorMessage = (error: { message: string }): string => {
  const errorMessage = error.message;

  
  const pattern = /^(.*)\snot found$/i;
  const match = errorMessage.match(pattern);
  
  if (match) {
    const dynamicText = match[1].trim();
    return dynamicErrorMessages['not found'](dynamicText);
  }

  // Verificar mensagens mapeadas ou retornar erro padrão
  return errorMessages[errorMessage] || errorMessages.default;
};
