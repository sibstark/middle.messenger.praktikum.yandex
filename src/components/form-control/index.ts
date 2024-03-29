import { Input, Label } from "@components";
import { EventBlock } from "@utils";
import template from "./form-control.hbs";
import { FormControlProps } from "./types";
import "./form-control.css";

export class FormControl extends EventBlock<FormControlProps> {
  label: Label;

  input: Input;

  constructor(props: FormControlProps) {
    if (!props.children) {
      props.children = {};
    }
    const label = new Label({
      classes: "form-control__error-label",
      text: ""
    });
    const input = new Input({
      name: props.name,
      type: props.type,
      placeholder: props.placeholder,
      classes: "form-control__input",
      events: props.events,
      value: props.value
    });
    props.children.label = label;
    props.children.input = input;
    super("div", props);
    this.label = label;
    this.input = input;
    this.makeError = this.makeError.bind(this);
    this.makeSuccess = this.makeSuccess.bind(this);
  }

  public get value(): string {
    return (this.input.getContent() as HTMLInputElement).value;
  }

  public get name(): string | null | undefined {
    return this.input.getContent()?.getAttribute("name");
  }

  makeError(error: string) {
    this.label.setProps({
      text: error,
      classes: "form-control__error-label form-control__error-label_shown"
    });
  }

  makeSuccess() {
    this.label.setProps({
      text: "",
      classes: "form-control__error-label"
    });
  }

  // eslint-disable-next-line no-undef
  public addEvent(name: string, event: EventListener) {
    this.input.addEvent(name, event);
  }

  // eslint-disable-next-line no-undef
  public removeEvent(name: string, event: EventListener) {
    this.input.removeEvent(name, event);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      classes: this.props.classes,
      title: this.props.title
    });
  }
}
export * from "./empty-form-control";
export * from "./types";
