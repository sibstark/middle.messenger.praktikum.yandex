import { AuthAPI } from "@api";
import { SigninRequest, SignupRequest, Action } from "@types";
import { Router, store } from "@utils";
import { path } from "@routes";

class AuthController {
  private api: AuthAPI;

  private router = new Router();

  constructor() {
    // store.set("user", {});
    this.api = new AuthAPI();
  }

  async signup(data: SignupRequest): Promise<Action<any>> {
    const user = store.getState().user;
    if (user?.fetching) {
      throw new Error("Already in process");
    }
    store.set("user.fetching", true);
    try {
      await this.api.signup(data);
      const user = await this.fetchUser();
      this.router.go(path.app);
      return user;
    } catch (e) {
      console.log("signup", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }

  async signin(data: SigninRequest): Promise<Action<any>> {
    const user = store.getState().user;
    if (user?.fetching) {
      throw new Error("Already in process");
    }
    store.set("user.fetching", true);
    try {
      await this.api.singin(data);
      const user = await this.fetchUser();
      this.router.go(path.app);
      return user;
    } catch (e) {
      store.set("user.error", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      store.set("user.user", null);
      this.router.go(path.login);
    } catch (e) {
      console.log("logout", e);
    }
  }

  async fetchUser(): Promise<Action<any>> {
    store.set("user.fetching", true);
    try {
      const user = await this.api.getUser();
      store.set("user.user", user);
      return {
        success: true,
        entity: user
      };
    } catch (e) {
      store.set("user.error", e);
      console.log("fetchUser", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }
}

export const authController = new AuthController();
