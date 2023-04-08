export function classnames(...args: (string | undefined)[]) {
  return args.filter(_ => _).join(" ");
}

export function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

export function trim(str: string, chars?: string) {
  if (str && !chars) {
    return str.trim();
  }
  const pattern = new RegExp(`[${chars}]`, "g");
  return str.replace(pattern, "");
}
