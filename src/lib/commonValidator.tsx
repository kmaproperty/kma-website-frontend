export function matchIsString(text: unknown): text is string {
  return typeof text === 'string';
}

export function matchIsNumeric(text: unknown): boolean {
  const isNumber = typeof text === 'number';
  const isString = matchIsString(text);
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}