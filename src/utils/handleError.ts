import { toast } from "sonner"
import { getErrorMessage,  } from "./errorMessages"

export const handleError = (error: any) => {
    const messageError = error.message
    toast.error(getErrorMessage(messageError))
}