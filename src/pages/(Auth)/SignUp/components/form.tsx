import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { useAuth } from "@/hooks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { formVariants } from "@/animations";
import { Input, Button } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/validation";

export const Form = () => {
  const { signUp } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const { document, email, name, password, phone } = data;

    setIsLoading(!isLoading);

    await signUp
      .mutateAsync({
        name,
        email,
        phone,
        password,
        document,
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const inputs = [
    {
      id: "name",
      label: "Nome Completo",
      type: "text",
      placeholder: "John Doe",
      showToggle: false,
    },
    {
      id: "email",
      label: "E-mail",
      type: "email",
      placeholder: "john@example.com",
      showToggle: false,
    },
    {
      id: "phone",
      label: "Numero",
      type: "text",
      mask: "(99) 99999-9999",
      placeholder: "(00) 00000-0000",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue("phone", e.target.value),
      showToggle: false,
    },
    {
      id: "document",
      label: "CPF",
      type: "text",
      mask: "999.999.999.99",
      placeholder: "000.000.000-00",
      showToggle: false,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue("document", e.target.value),
    },
    {
      id: "password",
      label: "Senha",
      type: showPassword ? "text" : "password",
      placeholder: "••••••••",
      showToggle: true,
      toggleState: showPassword,
      onToggle: () => setShowPassword(!showPassword),
    },
    {
      id: "confirmPassword",
      label: "Confirmar Senha",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "••••••••",
      showToggle: true,
      toggleState: showConfirmPassword,
      onToggle: () => setShowConfirmPassword(!showConfirmPassword),
    },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {inputs.map(
        ({
          id,
          label,
          type,
          placeholder,
          showToggle,
          toggleState,
          onToggle,
          mask,
          onChange,
        }) => (
          <div key={id} className="space-y-2">
            <label className="text-sm font-medium text-gray-200">{label}</label>
            <div className="relative">
              <Input
                {...register(id as keyof SignUpFormData)}
                id={id}
                mask={mask}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                error={!!errors[id as keyof SignUpFormData]}
                variant="filled"
                className={showToggle ? "pr-10" : ""}
              />
              {showToggle && (
                <button
                  type="button"
                  onClick={onToggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {toggleState ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
            {errors[id as keyof SignUpFormData] && (
              <p className="text-sm text-red-500">
                {errors[id as keyof SignUpFormData]?.message}
              </p>
            )}
          </div>
        )
      )}

      <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
        Criar conta
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#121212] px-2 text-gray-400">Ou</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-[#187BF0] hover:underline">
          Login
        </Link>
      </p>
    </motion.form>
  );
};
