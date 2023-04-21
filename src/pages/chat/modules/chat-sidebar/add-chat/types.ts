import { Button, Input } from "@components";
import { Events } from "@types";

export type ModalBodyProps = Events & {
  input: Input;
  button: Button;
};
