import { TStore } from "@types";

export function connectUser(store: TStore) {
  return store.user;
}
