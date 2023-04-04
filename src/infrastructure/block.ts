import { renderTemplate } from "@utils";
import { v4 } from "uuid";
import { Children, IRenderer } from "@types";
import { EventBus } from "./event-bus";

export type Tag =
  | "div"
  | "input"
  | "template"
  | "a"
  | "button"
  | "label"
  | "form"
  | "main"
  | "aside"
  | "nav";
export type TProps = Children & {
  [index: string | symbol]: any;
};

type Event =
  | "init"
  | "flow:component-did-mount"
  | "flow:component-did-update"
  | "flow:render";

type TMeta = {
  tag: Tag;
  props: TProps;
};
export class Block<T extends TProps = Record<string | symbol, any>> implements IRenderer {
  static EVENTS: Record<string, Event> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  protected _element: HTMLElement | null = null;

  _meta: TMeta;

  protected props: T;

  protected eventBus: () => EventBus;

  protected children: Record<string, Block | Block[]> = {};

  protected readonly _id: string;

  /** JSDoc
   * @param {string} tag
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tag: Tag = "div", props: T = {} as T) {
    const eventBus = new EventBus();
    this._meta = {
      tag,
      props
    };
    this._id = v4();

    const divided = this._getChildren(props);

    this.children = divided.children;

    this.props = this._makePropsProxy({ ...divided.props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag);
  }

  private _init() {
    this._createResources();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(_ => _.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // Может переопределять пользователь, необязательно трогать
  // @ts-ignore
  public componentDidMount(oldProps?: T) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  // @ts-ignore
  public componentDidUpdate(oldProps: T, newProps: T) {
    return true;
  }

  public setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private get element() {
    return this._element;
  }

  public get name(): string | null | undefined {
    return this._element?.getAttribute("name");
  }

  private _getChildren(propsAndChildren: T): {
    children: Record<string, Block | Block[]>;
    props: Record<string, any>;
  } {
    const children: Record<string, Block | Block[]> =
      propsAndChildren.children || {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) &&
          value.length > 0 &&
          value.every(_ => _ instanceof Block))
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  protected addEvents() {}

  protected removeEvents() {}

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
    this.addEvents();
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach(eventName => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
    this.removeEvents();
  }

  private _render() {
    this._removeEvents();
    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;
    // this needs to update html node and rerender content
    if (this._element && element) {
      this._element.replaceWith(element);
    }
    this._element = element;
    this._addEvents();
  }

  protected compile(template: string, context: TProps): DocumentFragment {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([name, child]) => {
      // need to add array of children as one prop
      // notice: this doesn't work if dont use {{{}}} brackets
      // got this code from webinar on 23.03
      if (Array.isArray(child)) {
        contextAndStubs[name] = child
          .map((child: Block) => `<div data-id="${child._id}"></div>`)
          .join("");
      } else {
        contextAndStubs[name] = `<div data-id="${child._id}"></div>`;
      }
    });
    const html = renderTemplate(template, contextAndStubs);
    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = html;
    const replaceStub = (component: Block) => {
      // find already html with necessary id and replace by dom content, not plain text
      const stub = fragment.content.querySelector(
        `[data-id="${component._id}"]`
      );

      if (!stub) {
        return;
      }
      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent());
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return fragment.content;
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent(): HTMLElement {
    return this.element!;
  }

  private _makePropsProxy(props: TProps): T {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const _self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: TProps, prop: string | symbol, value) {
        const oldProps = { ...target };
        target[prop] = value;
        _self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("нет доступа");
      }
    }) as T;
  }

  private _createDocumentElement(tag: Tag): HTMLElement | HTMLTemplateElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tag);
  }

  public show() {
    this.getContent().style.display = "block";
  }

  public hide() {
    this.getContent().style.display = "none";
  }

  public unmount() {
    this.getContent().remove();
  }
}
