import axios from 'axios'

/**
 * Obtém o endereço IP público do usuário.
 * @returns {Promise<string>} O endereço IP como uma string.
 */
export async function getIPAddress(): Promise<string> {
  try {
    const response = await axios.get<{ ip: string }>(
      'https://api.ipify.org?format=json',
    )
    console.log('IP capturado:', response.data.ip)
    return response.data.ip
  } catch (error) {
    console.error('Erro ao obter o IP:', error)
    return ''
  }
}
