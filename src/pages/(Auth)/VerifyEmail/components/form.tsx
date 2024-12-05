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
            <motion.form       initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Código de Verificação
                </label>
                <Input
                  {...register('code')}
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  error={!!errors.code}
                  variant="filled"
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Verificar código
              </Button>
            </motion.form>
    )
}