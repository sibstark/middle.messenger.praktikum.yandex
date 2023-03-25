import { TValidationStatus } from "@types";

export function loginValidation(
  value: string,
  context: any
): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^[a-zA-Z0-9_-]{3,20}(?<!\d)$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function passValidation(value: string, context: any): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function confirmPassValidation(
  value: string,
  context: any
): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  if (context.password !== value) {
    return { error: "Don't match" };
  }
  const rule = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function phoneValidation(
  value: string,
  context: any
): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^\+?\d{10,15}$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function nameValidation(value: string, context: any): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^[А-ЯЁA-Z][а-яёa-z\-]*$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function emailValidation(
  value: string,
  context: any
): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Invalid email";
  return { error };
}
