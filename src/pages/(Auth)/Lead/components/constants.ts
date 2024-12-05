import { Star, Zap, Infinity, Check } from "lucide-react";
import type { InputConfig } from "./types";

export const plans = [
  {
    name: "Essencial",
    price: "97",
    limit: "Até 10 vídeos",
    icon: Star,
    features: [
      "Upload ilimitado de vídeos",
      "Player personalizado",
      "Analytics básico",
      "Suporte por email",
    ],
    cta: "Começar gratuitamente",
  },
  {
    name: "Profissional",
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
    name: "Ilimitado",
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
    cta: "Falar com vendas",
  },
];

export const formInputs: InputConfig[] = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Seu nome completo",
  },
  {
    id: "email",
    label: "E-mail",
    type: "email",
    placeholder: "seu@email.com",
  },
  {
    id: "phone",
    label: "Telefone",
    type: "text",
    placeholder: "(00) 00000-0000",
  },
  {
    id: "cpf",
    label: "CPF/CNPJ",
    type: "text",
    placeholder: "000.000.000-00",
  },
];
