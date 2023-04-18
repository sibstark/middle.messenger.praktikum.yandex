import { Button, Input } from "@components";
import { SearchResult } from "./search-result";

export type ModalBodyProps = {
  users: SearchResult[];
  input: Input;
  button: Button;
};

export type ConstructModalBodyProps = Pick<ModalBodyProps, "users">;
