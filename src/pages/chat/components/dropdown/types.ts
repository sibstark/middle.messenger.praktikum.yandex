import { ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type DropdownItemProps = {
  icon: string;
  title: string;
}

export type DropdownProps = ExternalClasses<{
  trigger: Block | string;
  position?: string;
  content: Block[];
}>
