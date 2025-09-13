export const getType = (value: any) =>
  Object.prototype.toString.call(value)
    .replace(/(\[|\]|object )/g, '')

/**
 * Checks if a given value of a given type.
 *
 * @param value - The value to check.
 * @param constructor - The constructor to check against.
 * @returns - Whether the value is of the given type.
 */
export const isType = (
  value: any,
  constructor: string | string[]
): boolean => Array.isArray(constructor)
  ? constructor.includes(getType(value))
  : [ constructor ].includes(getType(value))

