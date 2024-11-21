export const limitPlan = (plan: string) => {
  let videoLimit
  switch (plan) {
    case 'Mensal - Essencial':
      videoLimit = 10
      break
    case 'Mensal - Profissional':
      videoLimit = 25
      break
    case 'Mensal - Ilimitado':
      videoLimit = 150
      break
  }

  return videoLimit
}