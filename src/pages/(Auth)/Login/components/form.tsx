import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/hooks";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { formVariants } from "@/animations";
import { Button, Input } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/validation";

interface FormProps {
  setIsForgotPasswordOpen: (value: boolean) => void;
}

export const Form = ({ setIsForgotPasswordOpen }: FormProps) => {
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    await signIn.mutateAsync({
      email: data.email,
      password: data.password,
    }).finally(() => setIsLoading(false));
  };

  const inputs = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      error: errors.email,
      className: "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500",
    },
    {
      id: "password",
      label: "Senha",
      type: showPassword ? "text" : "password",
      placeholder: "••••••••",
      error: errors.password,
      className: "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500 pr-10",
      isPassword: true,
    },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-6 py-2 overflow-y-auto px-1 w-full"
    >
      <div className="space-y-3 sm:space-y-4">
        {inputs.map(({ id, label, type, placeholder, error, className, isPassword }) => (
          <div key={id} className="space-y-1.5">
            <label className="text-sm font-medium text-gray-200">{label}</label>
            <div className="relative">
              <Input
                {...register(id as keyof LoginFormData)}
                type={type}
                placeholder={placeholder}
                error={!!error}
                className={`${className} h-10 sm:h-11 text-sm sm:text-base`}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ?
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> :
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  }
                </button>
              )}
            </div>
            {error && <p className="text-xs sm:text-sm text-red-500">{error.message}</p>}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsForgotPasswordOpen(true)}
          className="text-xs sm:text-sm text-[#187BF0] hover:underline"
        >
          Esqueceu a senha ?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full h-10 sm:h-11 text-sm sm:text-base"
        isLoading={isLoading}
      >
        Login
      </Button>

      <div className="relative py-2 sm:py-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#121212] px-2 text-xs sm:text-sm text-gray-400">Ou</span>
        </div>
      </div>

      <p className="text-center text-xs sm:text-sm text-gray-400">
        Não tem conta ainda?{" "}
        <Link to="/signup" className="text-[#187BF0] hover:underline">
          Criar conta
        </Link>
      </p>
    </motion.form>
  );
};