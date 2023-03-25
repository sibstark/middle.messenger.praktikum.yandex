import { Block, TProps } from "./block";

export class EventBlock<
  T extends TProps = Record<string | symbol, any>
> extends Block<T> {}
