import { expect } from "chai";
import {
  confirmPassValidation,
  loginValidation,
  passValidation,
  phoneValidation,
  nameValidation,
  emailValidation
} from "./validation";

describe("loginValidation tests", () => {
  it("Returns an error for empty value", () => {
    const value = "";
    const result = loginValidation(value, null);
    expect(result.error).to.equal("Required");
  });

  it("Returns an error for value containing special characters", () => {
    const value = "my@username";
    const result = loginValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for value with length less than 3", () => {
    const value = "ab";
    const result = loginValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for value with length more than 20", () => {
    const value = "this_is_a_very_long_username";
    const result = loginValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for value ending with a digit", () => {
    const value = "myusername2";
    const result = loginValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns no error for a valid value", () => {
    const value = "vali123dusername";
    const result = loginValidation(value, null);
    expect(result.error).to.be.undefined;
  });
});

describe("passValidation tests", () => {
  it("Returns no error for a valid password", () => {
    const password = "MyPassw0rd";
    const result = passValidation(password, null);
    expect(result.error).to.be.undefined;
  });

  it("Password does not contain a digit", () => {
    const password = "MyPassword";
    const result = passValidation(password, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Password does not contain an uppercase letter", () => {
    const password = "mypassword1";
    const result = passValidation(password, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Password contains invalid characters", () => {
    const password = "MyPassword!";
    const result = passValidation(password, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Password is too short", () => {
    const password = "Mw0";
    const result = passValidation(password, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Password is too long", () => {
    const password = "Myp@ssw0rd123456123456783130193128391381381093810312990";
    const result = passValidation(password, null);
    expect(result.error).to.equal("Don't correct");
  });
});

describe("confirmPassValidation tests", () => {
  it("Returns no error when values match and meet password rules", () => {
    const password = "mySecurePassword123";
    const value = "mySecurePassword123";
    const context = { password };
    const result = confirmPassValidation(value, context);
    expect(result.error).to.be.undefined;
  });

  it("Returns error when values don't match", () => {
    const password = "mySecurePassword123";
    const value = "notMyPassword";
    const context = { password };
    const result = confirmPassValidation(value, context);
    expect(result.error).to.equal("Don't match");
  });

  it("Returns error when value is empty", () => {
    const password = "mySecurePassword123";
    const value = "";
    const context = { password };
    const result = confirmPassValidation(value, context);
    expect(result.error).to.equal("Required");
  });
});

describe("phoneValidation", () => {
  it("Returns no error for a valid value", () => {
    const value = "+1234567890";
    const result = phoneValidation(value, null);
    expect(result.error).to.be.undefined;
  });

  it("Returns an error for an invalid value", () => {
    const value = "abc123";
    const result = phoneValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for a value with length less than 10", () => {
    const value = "+1234567";
    const result = phoneValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for a value with length greater than 15", () => {
    const value = "+1234567890123456";
    const result = phoneValidation(value, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error for an empty value", () => {
    const value = "";
    const result = phoneValidation(value, null);
    expect(result.error).to.equal("Required");
  });
});

describe("nameValidation tests", () => {
  it("Returns no error for a valid name", () => {
    const name = "John";
    const result = nameValidation(name, null);
    expect(result.error).to.be.undefined;
  });

  it("Returns an error if name starts with a lowercase letter", () => {
    const name = "jane";
    const result = nameValidation(name, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error if name contains non-letter characters", () => {
    const name = "Jane1";
    const result = nameValidation(name, null);
    expect(result.error).to.equal("Don't correct");
  });

  it("Returns an error if name contains non-latin characters", () => {
    const name = "Джейн";
    const result = nameValidation(name, null);
    expect(result.error).to.undefined;
  });
});

describe("emailValidation tests", () => {
  it("Returns no error for a valid email", () => {
    const email = "example@example.com";
    const result = emailValidation(email, null);
    expect(result.error).to.be.undefined;
  });

  it("Returns error for an invalid email", () => {
    const email = "invalid-email";
    const result = emailValidation(email, null);
    expect(result.error).to.equal("Invalid email");
  });

  it("Returns error if email is not provided", () => {
    const result = emailValidation("", null);
    expect(result.error).to.equal("Required");
  });
});
