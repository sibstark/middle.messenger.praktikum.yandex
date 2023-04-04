import { Block, EventBlock } from "@infrastructure";

export type ExternalClasses<T> = T & {
  classes?: string;
};

export type Children = {
  children?: Record<string, EventBlock | Block | (Block | EventBlock)[]>;
};

export type Events = {
  events?: Record<string, Function>;
};

export interface IRootQuery {
  root: string;
}

export interface IRenderer {
  getContent(): HTMLElement;
}

export interface IValidation {
  makeSuccess(): void;
  makeError(error: string): void;
}

export type TValidationStatus = {
  error?: string;
};
export type TValidationFunc = (
  value: string,
  context: any
) => TValidationStatus;
