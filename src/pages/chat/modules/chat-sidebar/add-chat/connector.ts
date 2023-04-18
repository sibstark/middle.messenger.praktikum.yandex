import { TStore } from "@utils";
import { SearchResult } from "./search-result";

export function connectUsers(store: TStore): { users: SearchResult[] } {
  const users = store.user.users.map(u => new SearchResult({ user: u }));
  return {
    users
  };
}
