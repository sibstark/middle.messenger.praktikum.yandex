import { Button } from "@components";
import { User } from "@types";

export type SearchResultProps = {
  user: User;
  button: Button;
};

export type ConstructSearchResultProps = Omit<SearchResultProps, "button">;
