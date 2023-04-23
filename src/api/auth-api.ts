import { SigninRequest, User, SignupRequest } from "@types";
import BaseAPI from "./base-api";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signup(data: SignupRequest) {
    return this.http.post("/signup", {
      data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

  singin(data: SigninRequest) {
    return this.http.post("/signin", {
      data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

  logout() {
    return this.http.post("/logout");
  }

  getUser() {
    return this.http.get<User>("/user");
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
