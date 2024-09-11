export const formatDuration = (duration: string): string => {
  const [hours, minutes] = duration.split(':').map(Number)
  if (!isNaN(hours) && !isNaN(minutes)) {
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }
  return duration
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
