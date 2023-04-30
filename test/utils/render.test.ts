import { expect } from "chai";
import { renderTemplate } from "@utils";

describe("renderTemplate tests", () => {
  it("Should render a simple template with context", () => {
    const template = "<h1>Hello, {{name}}!</h1>";
    const context = { name: "Oleg" };
    const expectedOutput = "<h1>Hello, Oleg!</h1>";

    const output = renderTemplate(template, context);

    expect(output).to.equal(expectedOutput);
  });
});
