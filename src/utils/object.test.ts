import { expect } from "chai";
import {
  isPlainObject,
  isArray,
  isArrayOrObject,
  merge,
  isEqual,
  set,
  cloneDeep
} from "./object";

describe("isPlainObject tests", () => {
  it("Should return true for an empty object", () => {
    const result = isPlainObject({});
    expect(result).to.be.true;
  });

  it("Should return true for an object with string properties", () => {
    const result = isPlainObject({ name: "Vasya", age: "30" });
    expect(result).to.be.true;
  });

  it("Should return false for a non-object value", () => {
    const result = isPlainObject("not an object");
    expect(result).to.be.false;
  });

  it("Should return false for an array", () => {
    const result = isPlainObject([1, 2, 3]);
    expect(result).to.be.false;
  });
});

describe("isArray tests", () => {
  it("Should return true for an array", () => {
    const result = isArray([1, 2, 3]);
    expect(result).to.be.true;
  });

  it("Should return false for a non-array value", () => {
    const result = isArray("not an array");
    expect(result).to.be.false;
  });

  it("Should return false for an object", () => {
    const result = isArray({ name: "Vasya", age: "30" });
    expect(result).to.be.false;
  });

  it("Should return false for null", () => {
    const result = isArray(null);
    expect(result).to.false;
  });

  it("Should return false for undefined", () => {
    const result = isArray(undefined);
    expect(result).to.false;
  });
});

describe("isArrayOrObject tests", () => {
  it("Should return true for an array", () => {
    const result = isArrayOrObject([1, 2, 3]);
    expect(result).to.be.true;
  });

  it("Should return true for an object", () => {
    const result = isArrayOrObject({ name: "Vasya", age: "30" });
    expect(result).to.be.true;
  });

  it("Should return false for null", () => {
    const result = isArrayOrObject(null);
    expect(result).to.be.false;
  });

  it("Should return false for undefined", () => {
    const result = isArrayOrObject(undefined);
    expect(result).to.be.false;
  });

  it("Should return false for a non-array and non-object value", () => {
    const result = isArrayOrObject("not an array or object");
    expect(result).to.be.false;
  });
});

describe("merge tests", () => {
  it("Should merge two objects", () => {
    const lhs = { name: "Vasya", age: "30" };
    const rhs = { age: "35", city: "New York" };
    const expectedOutput = { name: "Vasya", age: "35", city: "New York" };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal(expectedOutput);
  });

  it("Should merge nested objects", () => {
    const lhs = { name: "Vasya", address: { city: "New York", state: "NY" } };
    const rhs = { address: { state: "NJ", zip: "07030" } };
    const expectedOutput = {
      name: "Vasya",
      address: { city: "New York", state: "NJ", zip: "07030" }
    };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal(expectedOutput);
  });

  it("Should return the original object if the second object is empty", () => {
    const lhs = { name: "Vasya", age: "30" };
    const rhs = {};
    const expectedOutput = { name: "Vasya", age: "30" };

    const result = merge(lhs, rhs);

    expect(result).to.deep.equal(expectedOutput);
  });

  it("Should return the second object if the first object is empty", () => {
    const lhs = {};
    const rhs = { name: "John", age: "30" };
    const expectedOutput = { name: "John", age: "30" };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal(expectedOutput);
  });
});

describe("isEqual", () => {
  it("Should return true for equal strings", () => {
    expect(isEqual("hello", "hello")).to.be.true;
  });

  it("Should return false for different strings", () => {
    expect(isEqual("hello", "world")).to.be.false;
  });

  it("Should return false for objects with different props", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(isEqual(obj1, obj2)).to.be.false;
  });

  it("Should return false for objects with different values", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(isEqual(obj1, obj2)).to.be.false;
  });

  it("Should return true for equal objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(isEqual(obj1, obj2)).to.be.true;
  });
});

describe("set tests", () => {
  it("Should throw an error if path is not a string", () => {
    const obj = { a: 1 };
    const value = 2;
    // @ts-ignore
    expect(() => set(obj, null, value)).to.throw(Error, "path must be string");
  });

  it("Should return the original object if it is not a plain object", () => {
    const obj = "not an object";
    const path = "a.b.c";
    const value = 1;
    expect(set(obj, path, value)).to.equal(obj);
  });

  it("Should set a value at a deep path", () => {
    const obj = { a: { b: { c: 1 } } };
    const path = "a.b.c";
    const value = 2;
    const expected = { a: { b: { c: 2 } } };
    expect(set(obj, path, value)).to.deep.equal(expected);
  });

  it("Should create a new object if it does not exist at the path", () => {
    const obj = { a: {} };
    const path = "a.b.c";
    const value = 1;
    const expected = { a: { b: { c: 1 } } };
    expect(set(obj, path, value)).to.deep.equal(expected);
  });

  it("Should merge objects at the path", () => {
    const obj = { a: { b: { c: { d: 1 } } } };
    const path = "a.b.c";
    const value = { e: 2 };
    const expected = { a: { b: { c: { d: 1, e: 2 } } } };
    expect(set(obj, path, value)).to.deep.equal(expected);
  });
});

describe("cloneDeep test", () => {
  it("Should clone a simple object", () => {
    const obj = { a: 1, b: "two", c: true };
    const clonedObj = cloneDeep(obj);
    expect(clonedObj).to.deep.equal(obj);
    expect(clonedObj).to.not.equal(obj);
  });

  it("Should clone an array", () => {
    const arr = [1, "two", true];
    const clonedArr = cloneDeep(arr);
    expect(clonedArr).to.deep.equal(arr);
    expect(clonedArr).to.not.equal(arr);
  });

  it("Should clone a nested object", () => {
    const obj: Record<string, any> = { a: { b: { c: 1 } } };
    const clonedObj: Record<string, any> = cloneDeep(obj);
    expect(clonedObj).to.deep.equal(obj);
    expect(clonedObj.a).to.not.equal(obj.a);
    expect(clonedObj.a.b).to.not.equal(obj.a.b);
  });

  it("Should clone a Set", () => {
    const set = new Set([1, "two", true]);
    const clonedSet = cloneDeep(set);
    expect(clonedSet).to.deep.equal(set);
    expect(clonedSet).to.not.equal(set);
  });

  it("Should clone a Date", () => {
    const date = new Date("2022-05-01T00:00:00Z");
    const clonedDate = cloneDeep(date);
    expect(clonedDate).to.deep.equal(date);
    expect(clonedDate).to.not.equal(date);
  });
});
