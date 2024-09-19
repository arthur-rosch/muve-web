import { useQuery } from 'react-query'
import { SignatureService } from '../services/SignatureService'
import type { Signature } from '../types'

export const useSignature = () => {
  const getAllSignaturesByUserId = useQuery<Signature[]>(
    ['getAllSignaturesByUserId'],
    async () => {
      const { success, data, error } =
        await SignatureService.getAllSignaturesByUserId()
      console.log(success, data, error)
      if (success) {
        return data.folders
      }

      throw error
    },
  )

  return {
    getAllSignaturesByUserId,
  }
}
