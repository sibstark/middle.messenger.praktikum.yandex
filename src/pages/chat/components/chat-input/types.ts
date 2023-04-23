import { Events, ExternalClasses } from "@types";

export type ChatInputProps = ExternalClasses<
  Events & {
    placeholder: string;
    name?: string;
  }
>;
