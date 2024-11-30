import { errorMessages } from "@/utils";
import { toast } from "sonner";

export const handleError = (error: string) => {
    toast.error(errorMessages[error] || errorMessages.default);
  };
