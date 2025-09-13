export const get = (
  object: any,
  path: string,
  placeholder?: any
): any => {
  try {
    const expression = 'return o' + (path[0] !== '['
      ? '.' + path
      : path);

    const value = new Function('o', expression)(object);
    return value === undefined ? placeholder : value;
  } catch (_) {
    return placeholder;
  }
}

export const set = (
  object: any,
  path: string,
  value: any
): boolean => {
  try {
    const exp = 'o' + (path[0] !== '['
      ? '.' + path
      : path) + ' = v';

    new Function('o', 'v', exp)(object, value)

    return true
  } catch (_) {
    return false
  }
}
