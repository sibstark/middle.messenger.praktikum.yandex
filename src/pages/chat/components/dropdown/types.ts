import { ExternalClasses } from "@types";

export type DropdownItemProps = {
  icon: string;
  title: string;
}

export type DropdownProps = ExternalClasses<{
  trigger: string;
  position?: string;
  content: string;
}>
