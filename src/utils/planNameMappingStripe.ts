export const planNameMappingStripe = (priceId: string): string => {
  switch (priceId) {
    case 'price_1QFSPrEb05Ibkd2B63CkdONX':
      return 'Mensal - Essencial'
    case 'price_1QFSQWEb05Ibkd2BaOS032wb':
      return 'Mensal - Profissional'
    case 'price_1QFSQwEb05Ibkd2BjOjnD8Zs':
      return 'Mensal - Ilimitado'
    default:
      return 'Free'
  }
} 