import {
  User,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  FindUserRequest
} from "@types";
import BaseAPI from "./base-api";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  changeProfile(data: UpdateProfileRequest) {
    return this.http.put<User>("/profile", { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put<User>("/profile/avatar", {
      data
    });
  }

  changePassword(data: UpdatePasswordRequest) {
    return this.http.put("/password", { data });
  }

  findUser(data: FindUserRequest) {
    return this.http.post<User[]>("/search", { data });
  }

  getUserById(id: number) {
    return this.http.get<User>(`/user/${id}`);
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
