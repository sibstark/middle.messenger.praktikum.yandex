import { expect } from "chai";
import { formatDate } from "@utils";

describe("formatDate tests", () => {
  it("Date with the smallest possible hour value", () => {
    const date = new Date(2000, 0, 1, 0, 0, 0);
    expect(formatDate(date)).to.equal("00:00");
  });

  it("Date with the largest possible hour value", () => {
    const date = new Date(2000, 0, 1, 23, 59, 59);
    expect(formatDate(date)).to.equal("23:59");
  });

  it("Returns the expected string for a typical date and time", () => {
    const date = new Date(2022, 4, 1, 10, 30, 0);
    expect(formatDate(date)).to.equal("10:30");
  });

  it("Date with a single-digit hour and minute value", () => {
    const date = new Date(2022, 4, 1, 3, 5, 0);
    expect(formatDate(date)).to.equal("03:05");
  });

  it("Date with a double-digit hour and single-digit minute value", () => {
    const date = new Date(2022, 4, 1, 14, 5, 0);
    expect(formatDate(date)).to.equal("14:05");
  });

  it("Date with a single-digit hour and double-digit minute value", () => {
    const date = new Date(2022, 4, 1, 3, 55, 0);
    expect(formatDate(date)).to.equal("03:55");
  });

  it("Date with a double-digit hour and minute value", () => {
    const date = new Date(2022, 4, 1, 14, 55, 0);
    expect(formatDate(date)).to.equal("14:55");
  });
});
