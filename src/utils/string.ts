export function classnames(...args: (string | undefined)[]) {
  return args.filter(_ => _).join(" ");
}

export function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}
