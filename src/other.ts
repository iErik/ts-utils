type MapFn = (entry: [ string, any ]) => [ string, any ]

/**
 * Faciliates the job of re-mapping a given object,
 * receives the object to be remapped and a function as second
 * parameter which will be used to iterate over each of the
 * object's key/value pair.
 *
 * @param obj - The object to be remapped, the original
 * object reference will remain untouched
 * @param mapFn - The function to be used in the iteration,
 * will receive the key/value pair as an array, with key as
 * the first item and value as the second.
 * @returns A new object remapped according to the logic in
 * the mapFn function.
 */
export const map = <T extends object>(
  obj: Record<string, any>,
  mapFn: MapFn
): T => {
  const objEntries = Object.entries(obj)
  const newEntries = new Array(objEntries.length)

  // This is the most performatic way to map a list in JS
  for (let i = 0; i < newEntries.length; ++i)
    newEntries[i] = mapFn(objEntries[i])

  return Object.fromEntries(newEntries) as T
}

type RGBCodes = {
  r: string | number,
  g: string | number,
  b: string | number
}

/**
 * Converts a hex color to an RGB color.
 *
 * @param {string} hex - The hex color to convert.
 * @param {number} opacity - The opacity of the color.
 * A number between 0 and 1.
 *
 * @returns {object} - An object containing the RGB codes
 * and the CSS string.
 */
export const hexToRgb = (
  hex: string,
  opacity: number = 1
): { css: string, codes: RGBCodes } | null => {
  const tokenCapture = '([a-f\\d]{2})'.repeat(3)
  const tokens = new RegExp(`^#?${tokenCapture}$`, 'ig')
    .exec(hex)

  if (!tokens) return null

  const codes = {
    r: parseInt(tokens[1], 16),
    g: parseInt(tokens[2], 16),
    b: parseInt(tokens[3], 16),
  }

  return {
    codes,
    css: `rgba(${[
      ...Object.values(codes),
      Math.max(Math.min(opacity, 1), 0)
    ].join(', ')})`
  }
}

/**
 *
 */
export const executeMap = (
  map: { [fnName: string]: (...args: any) => any } = {},
  key: string = '',
  args: Array<any> = []
): any => Object.keys(map).includes(key)
  ? map[key](...args)
  : null
