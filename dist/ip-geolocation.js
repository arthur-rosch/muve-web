;(function () {
  // Função para obter o IP do usuário
  async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      console.log('IP capturado:', data.ip)
      return data.ip
    } catch (error) {
      console.error('Erro ao obter o IP:', error)
      return ''
    }
  }

  async function getGeolocation(ip) {
    try {
      const formattedIp = ip.replace(/\./g, '')

      const response = await fetch(
        `http://www.geoplugin.net/json.gp?ip=${formattedIp}`,
      )
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`)
      }

      const data = await response.json()
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
      return {}
    }
  }

  // Função para chamar a API que gera a URL assinada
  async function fetchSignedUrl(videoId) {
    try {
      const response = await fetch(
        'https://a96d-2804-10c4-f7a2-7e-b9ee-ba32-d23d-f128.ngrok-free.app/generate/url',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ videoId }),
        },
      )
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`)
      }
      const data = await response.json()
      console.log('URL assinada:', data.signedUrl)
      return data.signedUrl
    } catch (error) {
      console.error('Erro ao chamar a API de URL assinada:', error)
      return ''
    }
  }

  // Função para construir a URL do player com parâmetros
  async function buildIframeUrl(videoId) {
    const ipAddress = await getIPAddress()
    const geolocation = await getGeolocation(ipAddress)
    // const signedUrl = await fetchSignedUrl(videoId)

    // if (!signedUrl) {
    //   console.error('Não foi possível obter a URL assinada')
    //   return ''
    // }

    // Combine todos os dados necessários
    const data = {
      origin: window.location.href,
      userAgent: navigator.userAgent,
      ipAddress,
      deviceType: /Mobi|Android/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop',
      ...geolocation,
    }

    // Construa a query string com todos os parâmetros
    const queryString = new URLSearchParams(data).toString()

    // Combine a URL assinada com os parâmetros
    const playerUrl = `https://678f-2804-10c4-f7a2-7e-b9ee-ba32-d23d-f128.ngrok-free.app/demo/player?${queryString}`
    console.log('URL do player:', playerUrl)
    return playerUrl
  }

  // Exponha a função buildIframeUrl globalmente
  window.buildIframeUrl = buildIframeUrl
})()
