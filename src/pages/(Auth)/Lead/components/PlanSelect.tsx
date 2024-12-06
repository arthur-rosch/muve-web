import React from "react";
import { ChevronDown } from "lucide-react";
import { plans } from "./constants";

interface PlanSelectProps {
  selectedPlanIndex: number;
  onPlanSelect: (index: number) => void;
}

export function PlanSelect({
  selectedPlanIndex,
  onPlanSelect,
}: PlanSelectProps) {
  const selectedPlan = plans[selectedPlanIndex];

  return (
    <div className="relative w-full">
      <select
        className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#187BF0]"
        value={selectedPlanIndex}
        onChange={(e) => onPlanSelect(Number(e.target.value))}
      >
        {plans.map((plan, index) => (
          <option key={plan.name} value={index} className="py-2">
            {plan.name} - R$ {plan.price}/mês
            {plan.popular ? " (Popular)" : ""}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}
