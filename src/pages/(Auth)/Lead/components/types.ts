import type { LucideIcon } from "lucide-react";
import type { LeadFormInputs } from "@/validation";
import type { ChangeEvent } from "react";

export interface InputConfig {
  id: keyof LeadFormInputs;
  label: string;
  type: string;
  mask?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export interface FormFieldProps {
  label: string;
  name: keyof LeadFormInputs;
  control: any;
  errors: any;
  placeholder: string;
  type?: string;
  mask?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
