import { useState } from "react";
import { Button, Input } from "../../";
import type { VideoForm } from "@/types";

export interface VideoFormModalProps {
  videoForm: VideoForm;
  handleSubmit: (formData: Record<string, string>) => void;
  handleClose: () => void;
}

export const VideoFormModal = ({
  videoForm,
  handleSubmit,
  handleClose,
}: VideoFormModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    handleSubmit(formData);
  };

  return (
    <>
      {/* Background overlay cobrindo toda a tela */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-10"></div>

      {/* Modal centralizado e cobrindo toda a tela */}
      <div className="fixed inset-0 flex items-center justify-center z-20 w-full h-full">
        <div className="">
          <h2 className="text-2xl font-semibold mb-6">
            Preencha as informações
          </h2>
          <form className="space-y-4">
            {videoForm.inputName && (
              <Input
                type="text"
                placeholder="Nome"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            )}
            {videoForm.inputEmail && (
              <Input
                type="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            )}
            {videoForm.inputPhone && (
              <Input
                type="tel"
                placeholder="Telefone"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            )}
          </form>
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
            <Button
              variant="secondary"
              onClick={handleFormSubmit}
              className="w-full"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
