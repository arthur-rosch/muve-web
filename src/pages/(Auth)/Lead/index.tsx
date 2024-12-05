import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLead } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { plans } from "./components/constants";
import { PlanCard } from "./components/plan-card";
import { LeadForm } from "./components/lead-form";

export function LeadCapture() {
  const { createLed } = useLead();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    const { success, data } = await createLed
      .mutateAsync({
        ...formData,
        document: formData.cpf,
      })
      .finally(() => setIsLoading(false));

    setIsLoading(false);

    if (success) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <div className="max-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white overflow-auto">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:mb-12"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 md:mb-4">
            Escolha o plano perfeito para seu negócio
          </h1>
          <p className="text-base md:text-lg text-[#8F9BBA]">
            Com o Muve, você tem personalização, análise detalhada e um custo
            fixo.
            <br className="hidden md:inline" />
            Sem surpresas, sem pagar por play.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 lg:sticky lg:top-6 order-2 lg:order-1"
            >
              <div className="w-full bg-[#1E1E1E]/50 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  Comece sua jornada agora
                </h2>
                <LeadForm
                  isLoading={isLoading}
                  onSubmit={handleLeadSubmit}
                  defaultPlan="Profissional"
                />
                <p className="text-xs text-[#8F9BBA] text-center mt-4 md:mt-6">
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
              className="w-full lg:w-1/2 order-1 lg:order-2 overflow-auto"
            >
              <div className="space-y-3 md:space-y-4 max-h-[40vh] lg:max-h-none overflow-y-auto lg:overflow-visible pb-6 lg:pb-0 px-0.5">
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
