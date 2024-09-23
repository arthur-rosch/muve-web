export const limitPlan = (plan: string) => {
  let videoLimit
  switch (plan) {
    case 'ESSENTIAL':
      videoLimit = 10
      break
    case 'PROFESSIONAL':
      videoLimit = 25
      break
    case 'UNLIMITED':
      videoLimit = 250
      break
  }

  return videoLimit
}
