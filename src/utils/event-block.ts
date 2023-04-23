import { IValidation } from "@types";
import { Block, Tag, TProps } from "@utils";

export class EventBlock<T extends TProps = Record<string | symbol, any>>
  extends Block<T>
  implements IValidation
{
  // eslint-disable-next-line no-undef
  protected events: Record<string, EventListener> = {};

  constructor(tag: Tag = "div", props: T = {} as T) {
    super(tag, props);
  }

  protected addEvents() {
    const events = this.events || {};
    Object.keys(events).forEach(_ =>
      this._element!.addEventListener(_, this.events[_])
    );
  }

  protected removeEvents() {
    const events = this.events || {};
    Object.keys(events).forEach(_ =>
      this._element!.removeEventListener(_, this.events[_])
    );
  }

  // eslint-disable-next-line no-undef
  public addEvent(name: string, event: EventListener) {
    this.events[name] = event;
    this._element!.addEventListener(name, event);
  }

  // @ts-ignore
  makeError(error: string) {}

  makeSuccess() {}

  // eslint-disable-next-line no-undef
  public removeEvent(name: string, event: EventListener) {
    delete this.events[name];
    this._element!.removeEventListener(name, event);
  }
}
