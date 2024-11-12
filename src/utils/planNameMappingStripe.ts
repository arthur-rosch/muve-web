export const planNameMappingStripe = (priceId: string): string => {
  switch (priceId) {
    case 'prod_R7AxU9mGmGka46':
      return 'Mensal - Essencial'
    case 'prod_R7AxU9mGmGka46 ':
      return 'Mensal - Profissional'
    case 'prod_R7AxU9mGmGka46  ':
      return 'Mensal - Ilimitado'
    default:
      return 'Plano desconhecido'
  }
}
