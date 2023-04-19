import { Children, Events, ExternalClasses } from "@types";

export type InputProps = Children &
  Events &
  ExternalClasses<{
    name?: string;
    type: string;
    placeholder?: string;
    value?: string | number;
    accept?: string;
  }>;
