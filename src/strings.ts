/* Unicode Normalization Forms spec:
 * https://www.unicode.org/reports/tr15/tr15-56.html
 *
 * NFD = Canonical Decomposition
 * NFC = Canonical Decomposition, followed by Canonical
 * Composition
 * NFKD =	Compatibility Decomposition
 * NFKC = Compatibility Decomposition, followed by
 * Canonical Composition
 *
 */
type UnicodeNormalizationForm
  = 'NFC'
  | 'NFD'
  | 'NFKC'
  | 'NFKD'

/**
 */
export const normalizeDiacritics = (
  text: string,
  form: UnicodeNormalizationForm = 'NFKD'
) => text.normalize(form).replace(/[\u0300-\u036f]/g, '')

/**
 */
export const splitAndNormalize = (text: string) => text
  .split(/\s+/g)
  .map(w => normalizeDiacritics(w))

/**
 */
export const fuzzySearch = (query: string, text: string) => {
  const queryWords = splitAndNormalize(query)
  const textWords = splitAndNormalize(text)
  let lastFindIdx = 0

  return queryWords.every(word =>
    textWords.slice(lastFindIdx).find((tw, i) => {
      if (!tw.includes(word)) return false

      lastFindIdx = lastFindIdx === i ? i + 1 : i
      return true
    }))
}

export const snakeToCamel = (str: string): string =>
  str.toLowerCase().replace(/([-_][a-z])/g, group => group
    .toUpperCase()
    .replace('-', '')
    .replace('_', ''))

export const camelToSnake = (str: string) =>
  str.split(/(?=[A-Z])/).join('_').toLowerCase()

export const camelToKebab = (str: string): string =>
  str.split(/(?=[A-Z])/).join('-').toLowerCase()

export const mkUuid = (length: number) => {
  let str = ''

  while (str.length < length)
    str += Math.random().toString(36).substring(2)

  return str
    .replace('.', '')
    .substring(0, length)
}
