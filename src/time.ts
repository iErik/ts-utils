export const secondsToMs = (seconds: number): number =>
  seconds * 1000

export const minuteToMs = (minutes: number): number =>
  secondsToMs(minutes * 60)

export const hourToMs = (hours: number): number =>
  minuteToMs(hours * 60)

