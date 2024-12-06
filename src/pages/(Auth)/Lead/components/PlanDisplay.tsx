import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
import { PlanCard } from "./plan-card";
import { BottomSheet } from "./BottomSheet";
import { motion } from "framer-motion";
import { plans } from "./constants";

interface Plan {
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
}

interface PlanDisplayProps {
  selectedPlanIndex: number;
  onPlanSelect: (index: number) => void;
}

export function PlanDisplay({
  selectedPlanIndex,
  onPlanSelect,
}: PlanDisplayProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <div className="block lg:hidden space-y-4">
        <PlanCard {...plans[selectedPlanIndex]} selected={true} />
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-lg text-white transition-colors"
        >
          <span>Ver outros planos</span>
          <ChevronUp className="h-5 w-5" />
        </button>

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title="Escolha seu plano"
        >
          <div className="space-y-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PlanCard
                  {...plan}
                  selected={selectedPlanIndex === index}
                  onClick={() => {
                    onPlanSelect(index);
                    setIsBottomSheetOpen(false);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </BottomSheet>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block space-y-4">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.name}
            {...plan}
            selected={selectedPlanIndex === index}
            onClick={() => onPlanSelect(index)}
          />
        ))}
      </div>
    </>
  );
}
