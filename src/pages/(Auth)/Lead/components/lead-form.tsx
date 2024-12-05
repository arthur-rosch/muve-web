import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { FormField } from "./form-field";
import { formInputs } from "./constants";

interface LeadFormProps {
  onSubmit: (data: LeadFormInputs) => Promise<void>;
  defaultPlan: string;
}

export function LeadForm({ onSubmit, defaultPlan }: LeadFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      plan: defaultPlan,
    },
  });

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        Crie sua conta
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {formInputs.map((input) => (
          <FormField
            key={input.id}
            label={input.label}
            name={input.id}
            control={control}
            errors={errors}
            placeholder={input.placeholder}
            type={input.type}
          />
        ))}
        <Button
          type="submit"
          className="w-full py-7 mt-2 bg-[#187BF0] hover:bg-[#1569D3] text-white font-medium text-base md:text-lg"
        >
          Criar Conta
        </Button>
      </form>
      <p className="text-[10px] md:text-xs text-[#8F9BBA] text-center mt-4 md:mt-6">
        Ao criar uma conta, você concorda com nossos Termos de Serviço e Política
        de Privacidade.
      </p>
    </div>
  );
}