type Indexed<T = unknown> = {
  [key in string]: T;
};
export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | object {
  return isPlainObject(value) || isArray(value);
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const property in rhs) {
    if (!rhs.hasOwnProperty(property)) {
      continue;
    }

    const rValue = rhs[property];
    const lValue = lhs[property];

    if (isPlainObject(rValue) && isPlainObject(lValue)) {
      lhs[property] = merge(lValue as Indexed, rValue as Indexed);
    } else {
      lhs[property] = rValue;
    }
  }

  return lhs;
}

export function isEqual(a: object | string, b: object | string): boolean {
  if (typeof a === "string" && typeof b === "string") {
    return a === b;
  }
  if (!isPlainObject(a) || !isPlainObject(b)) {
    return false;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const property in a) {
    const aValue = (a as any)[property];
    const bValue = (b as any)[property];

    if (isPlainObject(aValue) && isPlainObject(bValue)) {
      if (isEqual(aValue, bValue)) {
        continue;
      }
      return false;
    }

    if (aValue === bValue) {
      continue;
    }
    return false;
  }

  return true;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }
  if (!isPlainObject(object)) {
    return object;
  }
  const concat = path.split(".").reduceRight<Indexed>((acc, cur) => {
    return {
      [cur]: acc
    };
  }, value as any);

  return merge(object as Indexed, concat);
}
export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(
    item: T
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: any[] = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: any = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach(
        // @ts-ignore
        s => (copy[s] = _cloneDeep(item[s] as any))
      );

      // Handle:
      // * Object.name (other)
      // @ts-ignore
      Object.keys(item).forEach((k: any) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
