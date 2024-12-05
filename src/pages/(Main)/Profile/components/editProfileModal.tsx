import { z } from "zod";
import { motion } from "framer-motion";
import { useState, type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardVariants } from "../../../../animations";
import { Input, Button, CustomModal } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../../redux/store/configureStore";
import { useProfile } from "../../../../hooks";
import { setUser } from "../../../../redux/actions/user";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Nome da pasta é obrigatório").optional(),
  phone: z.string().optional(),
  document: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface EditProfileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const { updateProfile } = useProfile();
  const { user } = useSelector((state: State) => state.user);

  const [createdSuccess, setCreatedSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      document: user.document!,
      name: user.name,
      phone: user.phone,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const { success } = await updateProfile.mutateAsync({
      document: data.document ? data.document : user.document!,
      name: data.name ? data.name : user.name!,
      phone: data.phone ? data.phone : user.phone!,
    });

    if (success) {
      toast.success("Perfil editado com sucesso");

      dispatch(
        setUser({
          ...user,
          document: data.document ? data.document : user.document!,
          name: data.name ? data.name : user.name!,
          phone: data.phone ? data.phone : user.phone!,
        })
      );

      setCreatedSuccess(true);
    } else {
      toast.error("Ocorreu um erro ao editar o perfil");
    }
  };

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={"h-auto w-[50rem] flex flex-col"}
    >
      <CustomModal.Title
        title="Editar Perfil"
        setIsOpen={setIsModalOpen}
        subTitle="Atualize as suas informações"
      />
      {createdSuccess ? (
        <>
          <CustomModal.Success text="Perfil editado com sucesso" />
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333] mt-20">
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsModalOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Confirmar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full p-6">
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-4">
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <label htmlFor="name" className="text-white text-sm">
                    Nome
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Nome"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </motion.div>
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <label htmlFor="phone" className="text-white text-sm">
                    Telefone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="phone"
                        type="text"
                        placeholder="Telefone"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      {errors.phone.message}
                    </span>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="w-full flex flex-col"
              >
                <label htmlFor="document" className="text-white text-sm">
                  Documento (CPF/CNPJ)
                </label>
                <Controller
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="document"
                      type="text"
                      placeholder="Documento"
                      className="w-full h-10 mt-2 mb-2"
                    />
                  )}
                />
                {errors.document && (
                  <span className="text-red-500 text-xs">
                    {errors.document.message}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="danger"
              onClick={() => setIsModalOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </div>
        </>
      )}
    </CustomModal.Root>
  );
};
