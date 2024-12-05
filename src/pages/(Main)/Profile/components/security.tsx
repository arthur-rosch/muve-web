import { motion } from "framer-motion";
import { type FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfile } from "../../../../hooks";
import { cardVariants } from "../../../../animations";
import type { State } from "../../../../redux/store/configureStore";
import { Input, Button, toastError } from "../../../../components";
import { Local } from "../../../../services/Local";
import { setUser, updateUserEmail } from "../../../../redux/actions/user";
import type { User } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Security: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: State) => state.user);
  const { updateEmail, updatePassword } = useProfile();

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [currentEmailPassword, setCurrentEmailPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditClick = (type: "password" | "email") => {
    if (type === "password") {
      setIsEditingPassword(true);
    } else {
      setIsEditingEmail(true);
    }
  };

  const handleCancelClick = (type: "password" | "email") => {
    if (type === "password") {
      setIsEditingPassword(false);
    } else {
      setIsEditingEmail(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (newEmail && currentEmailPassword) {
      try {
        const { success } = await updateEmail.mutateAsync({
          email: user.email,
          newEmail,
          password: currentEmailPassword,
        });

        if (success) {
          setIsEditingEmail(false);
          toast.success("E-mail alterado com sucesso");

          dispatch(updateUserEmail(newEmail));

          setNewEmail("");
          setCurrentEmailPassword("");
        }
      } catch (error) {
        setIsEditingPassword(false);
        toast.error("Erro ao atualizar e-mail");
        setNewEmail("");
        setCurrentEmailPassword("");
      }
    }
  };

  const handleLogout = () => {
    Local.logout();
    dispatch(setUser({} as User));
    navigate("/login");
  };

  const handlePasswordSubmit = async () => {
    if (newPassword === confirmPassword && currentPassword) {
      try {
        const { success } = await updatePassword.mutateAsync({
          newPassword,
          password: currentPassword,
        });

        if (success) {
          setIsEditingPassword(false);
          toast.success("Senha alterada com sucesso");
          setNewPassword("");
          setCurrentPassword("");
          setConfirmPassword("");
          handleLogout();
        }
      } catch (error) {
        setIsEditingPassword(false);
        toast.error("Erro ao atualizar senha");
        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
      }
    } else {
      toast.error(
        "As senhas não coincidem ou a senha atual não foi fornecida."
      );
    }
  };

  return (
    <section className="w-full mt-12">
      <motion.header
        className="flex flex-col border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <span className="text-white text-lg flex items-start justify-start">
          Segurança
        </span>
        <span className="text-[#909090] text-sm mt-4">
          Atualize aqui seu e-mail e senha.
        </span>
      </motion.header>

      {/* Sessão de E-mail */}
      <motion.div
        className="flex items-start justify-start border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="w-[200px] flex flex-col">
          <span className="text-white text-sm">Email</span>
          <span className="text-[#909090] text-sm mt-4">Meu nome</span>
        </div>
        <div>
          <div className="w-[600px] ml-96 mb-4">
            <label htmlFor="currentEmail" className="text-white text-sm">
              E-mail atual
            </label>
            <Input
              type="text"
              className="w-full mt-2"
              disabled={true}
              placeholder={user.email}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-[600px] ml-96">
            <div className="w-full">
              <label htmlFor="newEmail" className="text-white text-sm">
                Novo e-mail
              </label>
              <Input
                id="newEmail"
                type="text"
                value={newEmail}
                onBlur={() => setIsEditingEmail(false)}
                onFocus={() => setIsEditingEmail(true)} // Ativa modo de edição ao focar no input
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full mt-2 mb-2"
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-white text-sm">
                Senha atual
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentEmailPassword}
                onBlur={() => setIsEditingEmail(false)}
                onFocus={() => setIsEditingEmail(true)} // Ativa modo de edição ao focar no input
                onChange={(e) => setCurrentEmailPassword(e.target.value)}
                className="w-full mt-2 mb-2"
              />
            </div>
          </div>
          <div className="w-[600px] ml-96 mt-4">
            {isEditingEmail ? (
              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCancelClick("email")}
                  className="mr-2 w-full p-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full p-2"
                  onClick={handleEmailSubmit}
                >
                  {" "}
                  Salvar{" "}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-[600px] p-2"
                onClick={() => handleEditClick("email")}
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sessão de Senha */}
      <motion.div
        className="flex items-start justify-start mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="w-[200px] flex flex-col">
          <span className="text-white text-sm">Senha</span>
          <span className="text-[#909090] text-sm mt-4">
            Atualize aqui sua senha
          </span>
        </div>
        <div>
          <div className="w-[600px] ml-96 mb-4">
            <label htmlFor="currentPassword" className="text-white text-sm">
              Senha atual
            </label>
            <Input
              type="password"
              value={currentPassword}
              onBlur={() => setIsEditingPassword(false)}
              onFocus={() => setIsEditingPassword(true)} // Ativa modo de edição ao focar no input
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-2"
              disabled={!isEditingPassword}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-[600px] ml-96">
            <div className="w-full">
              <label htmlFor="newPassword" className="text-white text-sm">
                Nova senha
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onFocus={() => setIsEditingPassword(true)} // Ativa modo de edição ao focar no input
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 mb-2"
              />
            </div>
            <div className="w-full">
              <label htmlFor="confirmPassword" className="text-white text-sm">
                Repetir nova senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onBlur={() => setIsEditingPassword(false)}
                onFocus={() => setIsEditingPassword(true)} // Ativa modo de edição ao focar no input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 mb-2"
              />
            </div>
          </div>
          <div className="w-[600px] ml-96 mt-4">
            {isEditingPassword ? (
              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCancelClick("password")}
                  className="mr-2 w-full p-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full p-2"
                  onClick={handlePasswordSubmit}
                >
                  Salvar
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-[600px] p-2"
                onClick={() => handleEditClick("password")}
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
