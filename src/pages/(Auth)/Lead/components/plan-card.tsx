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
        "text-white relative w-full rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border-2",
        "p-4 sm:p-5 md:p-6", // Adjusted padding for different screen sizes
        selected
          ? "bg-[#187BF0] border-[#187BF0]"
          : "bg-[#1E1E1E] border-[#1E1E1E] hover:border-[#187BF0]/50"
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          {" "}
          {/* Added min-w-0 to prevent text overflow */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Icon
              className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0", // Made icon smaller on mobile
                selected ? "text-white" : "text-[#187BF0]"
              )}
            />
            <div className="min-w-0">
              {" "}
              {/* Added min-w-0 to prevent text overflow */}
              <h3 className="font-bold text-lg sm:text-xl flex flex-wrap gap-2 items-center">
                <span className="truncate">{name}</span>
                {popular && (
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-500 whitespace-nowrap">
                    Mais popular
                  </span>
                )}
              </h3>
              <p
                className={cn(
                  "text-sm truncate", // Added truncate
                  selected ? "text-white/90" : "text-[#8F9BBA]"
                )}
              >
                {limit}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          {" "}
          {/* Added flex-shrink-0 */}
          <div className="flex items-baseline justify-end">
            <span className="text-xs sm:text-sm">R$</span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold mx-1">
              {price}
            </span>
            <span
              className={cn(
                "text-xs sm:text-sm",
                selected ? "text-white/90" : "text-[#8F9BBA]"
              )}
            >
              /mês
            </span>
          </div>
          <p
            className={cn(
              "text-[10px] sm:text-xs mt-1 sm:mt-2",
              selected ? "text-white/90" : "text-[#8F9BBA]"
            )}
          >
            7 dias grátis
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 md:mt-6">
        <button
          className={cn(
            "w-full py-2 rounded-lg font-medium transition-colors text-sm sm:text-base", // Added responsive text size
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
