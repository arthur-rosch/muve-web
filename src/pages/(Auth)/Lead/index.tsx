import logo from "@/assets/logo.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLead } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LeadFormInputs, leadFormSchema } from "@/validation";
import { plans } from "./components/constants";
import { LeadForm } from "./components/lead-form";
import { PlanDisplay } from "./components/PlanDisplay";

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
    <div className="max-h-full h-full bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white overflow-auto flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 w-48 h-w-48 mb-8">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 lg:sticky lg:top-6 order-2 lg:order-1"
            >
              <div className="w-full bg-[#1E1E1E] backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8">
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
              className="w-full lg:w-1/2 order-1 lg:order-2"
            >
              <PlanDisplay
                selectedPlanIndex={selectedPlanIndex}
                onPlanSelect={setSelectedPlanIndex}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
