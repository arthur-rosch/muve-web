import { FormField } from "./form-field";
import type { ChangeEvent } from "react";
import type { InputConfig } from "./types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { motion } from "framer-motion";

interface LeadFormProps {
  onSubmit: (data: LeadFormInputs) => Promise<void>;
  defaultPlan: string;
}

export function LeadForm({ onSubmit, defaultPlan }: LeadFormProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      plan: defaultPlan,
    },
  });

  const formInputs: InputConfig[] = [
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
      mask: "(99) 99999-9999",
      placeholder: "(00) 00000-0000",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue("phone", e.target.value),
    },
    {
      id: "cpf",
      label: "CPF",
      type: "text",
      mask: "999.999.999.99",
      placeholder: "000.000.000-00",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue("cpf", e.target.value),
    },
  ];

  return (
    <div className="w-full">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 md:space-y-6"
      >
        {formInputs.map((input) => (
          <FormField
            key={input.id}
            label={input.label}
            name={input.id}
            control={control}
            errors={errors}
            placeholder={input.placeholder}
            type={input.type}
            mask={input.mask}
            onChange={input.onChange}
          />
        ))}
        <Button
          type="submit"
          className="w-full py-7 mt-2 bg-[#187BF0] hover:bg-[#1569D3] text-white font-medium text-base md:text-lg"
        >
          Criar Conta
        </Button>
      </motion.form>
    </div>
  );
}
