import { TValidationStatus } from "@types";

// Строка должна содержать только буквы латинского алфавита (в любом регистре),
// цифры, дефисы "-" и знаки подчёркивания "_".
// Длина строки должна быть от 3 до 20 символов.
// Строка не должна заканчиваться на цифру.
export function loginValidation(
  value: string,
  // @ts-ignore
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
// @ts-ignore
// Строка должна содержать как минимум одну цифру
// Строка должна содержать как минимум одну заглавную букву
// Строка не должна содержать символы, отличные от букв латинского алфавита,
// цифр и символов
// Длина строки должна быть от 8 до 40 символов
export function passValidation(value: string, context: any): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  const rule = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/;
  const isMatched = rule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

const passwordRule = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$/;
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
  const isMatched = passwordRule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function newPasswordPassValidation(
  value: string,
  context: any
): TValidationStatus {
  if (!value) {
    return { error: "Required" };
  }
  if (context.oldPassword !== value) {
    return { error: "Don't match" };
  }
  const isMatched = passwordRule.test(value);
  const error = isMatched ? undefined : "Don't correct";
  return { error };
}

export function phoneValidation(
  value: string,
  // @ts-ignore
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
// @ts-ignore
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
  // @ts-ignore
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
