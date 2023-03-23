import { Block } from "@infrastructure";

export type ExternalClasses<T> = T & {
  classes?: string;
};

export type Children = {
  children?: Record<string, Block>;
};

export type Events = {
  events?: Record<string, Function>;
};
