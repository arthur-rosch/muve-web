import { useAuth } from "@/hooks";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { formVariants } from "@/animations";
import { Button, Input } from "@/components";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema, type VerifyEmailFormData } from "@/validation";

export const Form = () => {
  const location = useLocation()
  const { validateVerificationCode } = useAuth()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);

    await validateVerificationCode.mutateAsync({
      code: data.code,
      email: location.state.email
    }).finally(() => setIsLoading(false))
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-6 py-2 max-h-[calc(100vh-16rem)] overflow-y-auto px-1"
    >
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm sm:text-base font-medium text-gray-200">
          Código de Verificação
        </label>
        <Input
          {...register('code')}
          type="text"
          placeholder="000000"
          maxLength={6}
          className="text-center text-base sm:text-lg tracking-widest h-12 sm:h-14"
          error={!!errors.code}
          variant="filled"
        />
        {errors.code && (
          <p className="text-xs sm:text-sm text-red-500">{errors.code.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11 sm:h-12 text-sm sm:text-base mt-4 sm:mt-6"
        size="lg"
        isLoading={isLoading}
      >
        Verificar código
      </Button>
    </motion.form>
  );
};