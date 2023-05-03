import { expect } from "chai";
import { classnames, trim } from "./string";

describe("classnames tests", () => {
  it("Should return a string with all defined classnames", () => {
    const result = classnames("foo", undefined, "bar", "baz", undefined);
    expect(result).to.equal("foo bar baz");
  });

  it("Should return an empty string if no classnames are defined", () => {
    const result = classnames(undefined, undefined, undefined);
    expect(result).to.equal("");
  });

  it("Should handle a single defined classname", () => {
    const result = classnames("foo");
    expect(result).to.equal("foo");
  });

  it("Should handle no arguments", () => {
    const result = classnames();
    expect(result).to.equal("");
  });
});

describe("trim tests", () => {
  it("Should trim whitespace from the beginning and end of the string", () => {
    const result = trim("  hello world  ");
    expect(result).to.equal("hello world");
  });

  it("Should remove specified characters from the string", () => {
    const result = trim("foo bar baz", "oa");
    expect(result).to.equal("f br bz");
  });

  it("Should handle empty input", () => {
    const result = trim("");
    expect(result).to.equal("");
  });

  it("Should handle undefined characters to trim", () => {
    const result = trim("foo bar baz", undefined);
    expect(result).to.equal("foo bar baz");
  });
});
