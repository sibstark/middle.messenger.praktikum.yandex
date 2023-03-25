import { Children, Events, ExternalClasses } from "@types";

export type LinkProps = Children &
  Events &
  ExternalClasses<{ href: string; text: string }>;
