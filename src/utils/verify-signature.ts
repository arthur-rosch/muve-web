import type { Signature } from "../types";

export function verifySignature(signature: Signature) {
  if (!signature) {
    return 'Usuário sem Plano';
  }

  switch (signature.status) {
    case 'canceled':
      return 'Assinatura cancelada.';

    case 'past_due':
      return 'Assinatura com pagamento atrasado.';

    case 'trialing':
      const trialEndDate = signature.trial_end_date;
      if (trialEndDate && new Date(trialEndDate) < new Date()) {
        return 'Período de teste expirado.';
      }
      break;

    case 'active':
      return null; // Assinatura válida

    case 'free':
      return null; // Assinatura válida

    default:
      return 'Assinatura inválida.';
  }

  return null; // Caso o status seja 'active' ou 'trialing' válido
}
