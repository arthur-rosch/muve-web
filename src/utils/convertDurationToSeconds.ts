export function convertDurationToSeconds(duration: string): number {
  const timeParts = duration.split(':').map((part) => Number(part.trim()))

  // Verifica se algum valor é NaN (caso a string não esteja no formato correto)
  if (timeParts.some(isNaN)) {
    console.error('O formato esperado é hh:mm:ss ou mm:ss')
    return 0 // Retorna 0 ou pode lançar um erro
  }

  let totalSeconds = 0

  // Se houver 2 partes, assume que é mm:ss
  if (timeParts.length === 2) {
    const [minutes, seconds] = timeParts
    totalSeconds = minutes * 60 + seconds
  }
  // Se houver 3 partes, assume que é hh:mm:ss
  else if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts
    totalSeconds = hours * 3600 + minutes * 60 + seconds
  } else {
    console.error('Formato inválido. Use hh:mm:ss ou mm:ss')
    return 0
  }

  console.log(totalSeconds)
  return totalSeconds
}
