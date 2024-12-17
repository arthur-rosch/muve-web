import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { useLead } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { plans } from "./components/constants";
import { LeadForm } from "./components/lead-form";
import { PlanDisplay } from "./components/PlanDisplay";
import logo from '@/assets/logo.svg';

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
    <div className="max-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white overflow-y-auto">
      <div className="container mx-auto px-4 py-4 min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Logo section */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 sm:w-44 my-4">
              <img src={logo} alt="" className="h-8 sm:h-10 w-auto object-contain" />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col-reverse gap-8">
            {/* Form section - Always on top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <div className="bg-[#1E1E1E] backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                  Comece sua jornada agora
                </h2>
                <LeadForm
                  isLoading={isLoading}
                  onSubmit={handleLeadSubmit}
                  defaultPlan="Profissional"
                />
                <p className="text-xs sm:text-sm text-[#8F9BBA] text-center mt-6">
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

            {/* Plan display section - Always below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full"
            >
              <div className="h-full">
                <PlanDisplay
                  selectedPlanIndex={selectedPlanIndex}
                  onPlanSelect={setSelectedPlanIndex}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
