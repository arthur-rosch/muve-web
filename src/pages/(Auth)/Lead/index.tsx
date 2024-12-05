import { useState } from "react";
import { motion } from "framer-motion";
import { useLead } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { plans } from "./components/constants";
import { PlanCard } from "./components/plan-card";
import { FormField } from "./components/form-field";
import { LeadForm } from "./components/lead-form";

export function LeadCapture() {
  const { createLed } = useLead();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(
    plans.findIndex((plan) => plan.popular) || 0
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormInputs>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      plan: plans[selectedPlanIndex].name,
    },
  });

  const handleLeadSubmit = async (formData: LeadFormInputs) => {
    console.log(formData);

    const { success, data } = await createLed({
      ...formData,
      document: formData.cpf,
    });

    if (success) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <div className="max-h-screen overflow-auto bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Escolha o plano perfeito para seu negócio
          </h1>
          <p className="text-lg text-[#8F9BBA]">
            Com o Muve, você tem personalização, análise detalhada e um custo
            fixo.
            <br className="hidden md:inline" />
            Sem surpresas, sem pagar por play.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 lg:sticky lg:top-6 order-2 lg:order-1 mt-8 lg:mt-0"
            >
              <div className="w-full bg-[#1E1E1E]/50 backdrop-blur-sm rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Comece sua jornada agora
                </h2>
                <LeadForm
                  onSubmit={handleLeadSubmit}
                  defaultPlan="Profissional"
                />
                <p className="text-xs text-[#8F9BBA] text-center mt-6">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <a href="#" className="text-[#187BF0] hover:underline">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-[#187BF0] hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full lg:w-1/2 order-1 lg:order-2"
            >
              <div className="space-y-6">
                {plans.map((plan, index) => (
                  <PlanCard
                    key={plan.name}
                    {...plan}
                    selected={selectedPlanIndex === index}
                    onClick={() => setSelectedPlanIndex(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
