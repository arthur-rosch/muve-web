import { Check } from "lucide-react";
import { cn } from "@/utils";
import type { PlanCardProps } from "./types";

export function PlanCard({
  name,
  price,
  limit,
  icon: Icon,
  features,
  cta,
  popular,
  selected,
  onClick,
}: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-full rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border-2",
        selected
          ? "bg-[#187BF0] border-[#187BF0]"
          : "bg-[#1A1F37] border-[#242B45] hover:border-[#187BF0]/50"
      )}
    >
      {popular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
            Mais popular
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon
            className={cn(
              "w-6 h-6",
              selected ? "text-white" : "text-[#187BF0]"
            )}
          />
          <div>
            <h3 className="font-bold text-xl">{name}</h3>
            <p
              className={cn(
                "text-sm",
                selected ? "text-white/90" : "text-[#8F9BBA]"
              )}
            >
              {limit}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-sm">R$</span>
            <span className="text-4xl font-bold mx-1">{price}</span>
            <span
              className={cn(
                "text-sm",
                selected ? "text-white/90" : "text-[#8F9BBA]"
              )}
            >
              /mês
            </span>
          </div>
          <p
            className={cn(
              "text-xs mt-2",
              selected ? "text-white/90" : "text-[#8F9BBA]"
            )}
          >
            7 dias grátis
          </p>
        </div>

        {/* <div className="space-y-3 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-start space-x-3">
              <Check
                className={cn(
                  "w-5 h-5 mt-0.5",
                  selected ? "text-white" : "text-[#187BF0]"
                )}
              />
              <span
                className={cn(
                  "text-sm",
                  selected ? "text-white/90" : "text-[#8F9BBA]"
                )}
              >
                {feature}
              </span>
            </div>
          ))}
        </div> */}

        <button
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-colors",
            selected
              ? "bg-white text-[#187BF0] hover:bg-white/90"
              : "bg-[#187BF0] text-white hover:bg-[#1569D3]"
          )}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
