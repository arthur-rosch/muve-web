import axios from 'axios'

interface GeolocationData {
  country: string
  region: string
  city: string
  latitude: string
  longitude: string
}

/**
 * Obtém a geolocalização com base no endereço IP fornecido.
 * @param {string} ip - O endereço IP para buscar a geolocalização.
 * @returns {Promise<GeolocationData>} Um objeto contendo os dados de geolocalização.
 */
export async function getGeolocation(ip: string): Promise<GeolocationData> {
  try {
    const response = await axios.get(
      `https://api.hackertarget.com/geoip?q=${ip}&output=json`,
    )
    if (response.status !== 200) {
      throw new Error(`Erro HTTP! Status: ${response.status}`)
    }

    const data = response.data
    console.log('Dados de geolocalização:', data)
    return {
      country: data.country || '',
      region: data.state || '',
      city: data.city || '',
      latitude: data.latitude || '',
      longitude: data.longitude || '',
    }
  } catch (error) {
    console.error('Erro ao obter a localização geográfica:', error)
    return {
      country: '',
      region: '',
      city: '',
      latitude: '',
      longitude: '',
    }
  }
}
