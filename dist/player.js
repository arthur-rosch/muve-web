;(function () {
  if (window.iframeInitialized) {
    console.log('Iframe já foi adicionado.')
    return
  }

  window.iframeInitialized = true

  // Criação e configuração do script para carregar a URL do iframe
  const script = document.createElement('script')
  script.async = true
  script.src =
    'https://678f-2804-10c4-f7a2-7e-b9ee-ba32-d23d-f128.ngrok-free.app/ip-geolocation.js'

  script.onload = async function () {
    if (typeof window.buildIframeUrl !== 'function') {
      console.error('Função buildIframeUrl não está disponível.')
      return
    }

    try {
      // Obtendo a URL do iframe a partir da função do script carregado
      const iframeUrl = await window.buildIframeUrl()

      if (!iframeUrl) {
        console.error('URL do iframe não foi gerada.')
        return
      }

      // Criação e configuração do iframe
      const iframe = document.createElement('iframe')
      iframe.setAttribute('data-player', 'true')
      iframe.style.maxWidth = '100%'
      iframe.style.width = '100%'
      iframe.style.display = 'block'
      iframe.style.aspectRatio = '1.767'
      iframe.style.margin = 'auto'
      iframe.allow = 'autoplay; gyroscope; picture-in-picture; geolocation;'
      iframe.allowFullscreen = true
      iframe.frameBorder = '0'
      iframe.src = iframeUrl
      iframe.sandbox = 'allow-scripts allow-same-origin'

      // Adicionando o iframe ao corpo do documento
      document.body.appendChild(iframe)
    } catch (error) {
      console.error('Erro ao construir o iframe:', error)
    }
  }

  script.onerror = function () {
    console.error('Erro ao carregar o script de geolocalização.')
  }

  // Adicionando o script ao cabeçalho do documento
  document.head.appendChild(script)
})()
