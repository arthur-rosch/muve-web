import { toast } from "sonner";
import { handleError } from "./handle-error";
import type { LeadVariables } from "../types";
import { useMutation } from "@tanstack/react-query";
import { LeadService } from "../services/LeadService";

export const useLead = () => {
  const createLed = useMutation({
    mutationFn: async (variables: LeadVariables) => {
      const response = await LeadService.create(variables);
      return response;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Ira ser redirecionado para o checkout.");

        window.location.href = response.data.url;
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error: any) => handleError(error.message),
  });

  return {
    createLed,
  };
};
