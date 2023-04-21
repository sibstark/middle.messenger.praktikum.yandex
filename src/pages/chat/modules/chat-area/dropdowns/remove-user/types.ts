import { SearchResult } from "./search-result";

export type ModalBodyProps = {
  users: SearchResult[];
};

export type ConstructModalBodyProps = Pick<ModalBodyProps, "users">;
