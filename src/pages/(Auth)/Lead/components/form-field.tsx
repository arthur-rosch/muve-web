import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { FormFieldProps } from "./types";

export function FormField({
  label,
  name,
  control,
  errors,
  placeholder,
  type = "text",
  onChange,
  mask,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-sm md:text-base font-medium text-[#8F9BBA]"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className="h-12 md:h-12 text-base"
            type={type}
            id={name}
            placeholder={placeholder}
            onChange={onChange}
            mask={mask}
          />
        )}
      />
      {errors[name] && (
        <p className="text-xs md:text-sm text-red-400">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
