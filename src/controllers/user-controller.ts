import { UserAPI } from "@api";
import {
  Action,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  FindUserRequest
} from "@types";
import { store } from "@utils";

class UserController {
  private api: UserAPI;

  constructor() {
    // store.set("user", {});
    this.api = new UserAPI();
  }

  async changeProfile(data: UpdateProfileRequest): Promise<Action<any>> {
    const user = store.getState().user;
    if (user?.fetching) {
      throw new Error("Already in process");
    }
    store.set("user.fetching", true);
    try {
      const user = await this.api.changeProfile(data);
      store.set("user.user", user);
      return {
        success: true,
        entity: user
      };
    } catch (e) {
      console.log("changeProfile", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }

  async changeAvatar(data: Blob): Promise<Action<any>> {
    const user = store.getState().user;
    if (user?.fetching) {
      throw new Error("Already in process");
    }
    store.set("user.fetching", true);
    try {
      const form = new FormData();
      form.append("avatar", data);
      const user = await this.api.changeAvatar(form);
      store.set("user.user", user);
      return {
        success: true,
        entity: user
      };
    } catch (e) {
      console.log("changeAvatar", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }

  async changePassword(data: UpdatePasswordRequest): Promise<Action<any>> {
    const user = store.getState().user;
    if (user?.fetching) {
      throw new Error("Already in process");
    }
    store.set("user.fetching", true);
    try {
      await this.api.changePassword(data);
      return {
        success: true,
        entity: null
      };
    } catch (e) {
      console.log("changePassword", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("user.fetching", false);
    }
  }

  async findUser(data: FindUserRequest): Promise<Action<any>> {
    try {
      const users = await this.api.findUser(data);
      return {
        success: true,
        entity: users
      };
    } catch (e) {
      return {
        success: false,
        entity: e
      };
    }
  }

  async getUserById(id: number): Promise<Action<any>> {
    store.set("user.fetching", true);
    try {
      const user = await this.api.getUserById(id);
      return {
        success: true,
        entity: user
      };
    } catch (e) {
      console.log("getUserById", e);
      return {
        success: false,
        entity: e
      };
    }
  }
}

export const userController = new UserController();
