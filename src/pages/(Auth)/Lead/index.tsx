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
    <div className="min-h-screen max-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white overflow-auto flex">
      <div className="container mx-auto px-4 py-3 sm:py-4 md:py-6 flex flex-col h-full">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
          <div className="flex items-center space-x-2 w-32 sm:w-48 h-8 sm:h-12 shrink-0 mb-3 sm:mb-4">
            <img src={logo} alt="" className="h-full w-auto object-contain" />
          </div>

          <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:space-x-6 xl:space-x-8 gap-4 sm:gap-6 min-h-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 lg:sticky lg:top-4 order-2 lg:order-1 flex-shrink-0"
            >
              <div className="w-full bg-[#1E1E1E] backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                  Comece sua jornada agora
                </h2>
                <LeadForm
                  isLoading={isLoading}
                  onSubmit={handleLeadSubmit}
                  defaultPlan="Profissional"
                />
                <p className="text-xs text-[#8F9BBA] text-center mt-3 sm:mt-4">
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
              className="w-full lg:w-1/2 order-1 lg:order-2 overflow-y-auto min-h-0 flex-1"
            >
              <div className="h-full overflow-y-auto">
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
