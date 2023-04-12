import { AuthAPI, SigninRequest, SignupRequest } from "@api";
import { Router, store } from "@utils";

class AuthController {
  private api: AuthAPI;

  private router = new Router();

  constructor() {
    store.set("user", {});
    this.api = new AuthAPI();
  }

  async signup(data: SignupRequest) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      this.router.go("/profile");
    } catch (e) {
      console.log("signup", console.log);
    }
  }

  async signin(data: SigninRequest) {
    try {
      await this.api.singin(data);
      await this.fetchUser();
    } catch (e) {
      store.set("user.error", e);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      this.router.go("/");
    } catch (e) {
      console.log("logout", e);
    }
  }

  async fetchUser() {
    store.set("user.fetching", true);
    try {
      const user = await this.api.getUser();
      store.set("user.user", user);
    } catch (e) {
      store.set("user.error", e);
      console.log("fetchUser", e);
    } finally {
      store.set("user.fetching", false);
    }
  }
}

export const authController = new AuthController();
