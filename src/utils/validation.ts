export function loginValidation(value: string, context: any) {
  const rule = /^[a-zA-Z0-9_-]{3,20}(?<!\d)$/;
  const isMatched = rule.test(value);
  return { isValid: isMatched, error: "Don't correct" };
}

export function passValidation(value: string, context: any) {
  const rule = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/;
  const isMatched = rule.test(value);
  return { isValid: isMatched, error: "Don't correct" };
}
