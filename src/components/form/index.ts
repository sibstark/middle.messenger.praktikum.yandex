import { Block, EventBlock } from "@utils";
import { IValidation } from "@types";
import template from "./form.hbs";
import { FromProps, TValidationScheme } from "./types";
import { FormControl } from "../form-control";

export class Form extends Block<FromProps> {
  validationScheme: TValidationScheme;

  constructor(props: FromProps, scheme: TValidationScheme) {
    super("form", props);
    this.validationScheme = scheme;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.subscribe();
  }

  _findElementByName(name: string): IValidation | undefined {
    if (Array.isArray(this.children.content)) {
      const element = (this.children.content as EventBlock[]).find(
        _ => _.name === name
      );
      return element ? (element as IValidation) : undefined;
    }
    return undefined;
  }

  _constructContext() {
    if (Array.isArray(this.children.content)) {
      const controls = this.children.content.filter(
        _ => _ instanceof FormControl
      ) as FormControl[];
      return controls.reduce((acc, cur) => {
        acc[cur.name as string] = cur.value;
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  }

  subscribe() {
    let blocks: EventBlock[] = [];

    if (Array.isArray(this.children.content)) {
      blocks = this.children.content.filter(
        _ => _ instanceof EventBlock
      ) as EventBlock[];
    }

    blocks.forEach(_ => {
      _.addEvent("focus", this.onFocus);
      _.addEvent("blur", this.onBlur);
    });
  }

  protected addEvents() {
    this._element!.addEventListener("submit", this.onSubmit.bind(this));
  }

  protected removeEvents() {
    this._element!.removeEventListener("submit", this.onSubmit.bind(this));
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const context = this._constructContext();
    const blocks = (this.children.content as Block[]).filter(
      _ => _ instanceof EventBlock
    ) as FormControl[];
    let isValid = true;
    blocks.forEach(_ => {
      const status = this.validationScheme[_.name as string]?.(
        _.value,
        context
      );
      if (status?.error) {
        isValid = false;
        _?.makeError(status.error);
      } else {
        _?.makeSuccess();
      }
    });
    if (isValid) {
      console.log(`Form ${this.props.name}`, context);
    }
  }

  _validOnEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    const element = this._findElementByName(input.name);
    const rule = this.validationScheme[input.name];
    const context = this._constructContext();
    const status = rule?.(input.value, context);
    if (status?.error) {
      element?.makeError(status.error);
    } else {
      element?.makeSuccess();
    }
  }

  onFocus(e: Event) {
    this._validOnEvent(e);
  }

  onBlur(e: Event) {
    this._validOnEvent(e);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
