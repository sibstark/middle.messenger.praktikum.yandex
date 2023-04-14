import { TStore } from "@utils";
import { User } from "@types";

export function connectUser(store: TStore): User | null {
  return store.user.user;
}
