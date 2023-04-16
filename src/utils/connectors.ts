import { TStore } from "@utils";
import { User } from "@types";

export function connectUser(store: TStore): { user: User | null } {
  return {
    user: store.user.user
  };
}
