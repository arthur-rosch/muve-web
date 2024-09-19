export const limitPlan = (plan: string, chargeFrequency?: string) => {
  let videoLimit
  switch (plan) {
    case 'FREE':
      videoLimit = 1
      break
    case 'ESSENTIAL':
      videoLimit = chargeFrequency === 'MONTHLY' ? 25 : 30
      break
    case 'PROFESSIONAL':
      videoLimit = chargeFrequency === 'MONTHLY' ? 75 : 100
      break
    case 'UNLIMITED':
      videoLimit = Infinity
      break
    default:
      videoLimit = 1
      break
  }

  return videoLimit
}
