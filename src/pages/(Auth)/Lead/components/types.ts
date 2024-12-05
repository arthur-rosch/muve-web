import type { LucideIcon } from "lucide-react";
import type { LeadFormInputs } from "@/validation";

export interface InputConfig {
  id: keyof LeadFormInputs;
  label: string;
  type: string;
  placeholder: string;
}

export interface FormFieldProps {
  label: string;
  name: keyof LeadFormInputs;
  control: any;
  errors: any;
  placeholder: string;
  type?: string;
}

export interface PlanCardProps {
  name: string;
  price: string;
  limit: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  popular?: boolean;
  selected?: boolean;
  onClick?: () => void;
}
