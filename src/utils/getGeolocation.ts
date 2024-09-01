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
    const formattedIp = ip.replace(/\./g, '')

    const response = await axios.get(
      `http://www.geoplugin.net/json.gp?ip=${formattedIp}`,
    )
    if (response.status !== 200) {
      throw new Error(`Erro HTTP! Status: ${response.status}`)
    }

    const data = response.data
    console.log('Dados de geolocalização:', data)
    return {
      country: data.geoplugin_countryName || '',
      region: data.geoplugin_regionName || '',
      city: data.geoplugin_city || '',
      latitude: data.geoplugin_latitude || '',
      longitude: data.geoplugin_longitude || '',
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
