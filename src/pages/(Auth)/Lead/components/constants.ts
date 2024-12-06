import { Star, Zap, Infinity, Check } from "lucide-react";
import type { InputConfig } from "./types";

export const plans = [
  {
    name: "Mensal - Essencial",
    price: "79",
    limit: "Até 10 vídeos",
    icon: Star,
    features: [
      "Upload ilimitado de vídeos",
      "Player personalizado",
      "Analytics básico",
      "Suporte por email",
    ],
    cta: "Começar agora",
  },
  {
    name: "Mensal - Profissional",
    price: "147",
    limit: "Até 25 vídeos",
    popular: true,
    icon: Zap,
    features: [
      "Tudo do plano Essencial",
      "Analytics avançado",
      "Prioridade no suporte",
      "Domínio personalizado",
      "Proteção de conteúdo",
    ],
    cta: "Começar agora",
  },
  {
    name: "Mensal - Ilimitado",
    price: "257",
    limit: "Até 150 vídeos",
    icon: Infinity,
    features: [
      "Tudo do plano Profissional",
      "API access",
      "Suporte 24/7",
      "SLA garantido",
      "Onboarding dedicado",
    ],
    cta: "Começar agora",
  },
];
