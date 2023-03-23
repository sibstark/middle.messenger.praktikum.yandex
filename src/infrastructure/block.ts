import { renderTemplate } from "@utils";
import { v4 } from "uuid";
import { Children } from "@types";
import { EventBus } from "./event-bus";

export type Tag = "div" | "input" | "template";
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
export class Block<T extends TProps = Record<string | symbol, any>> {
  static EVENTS: Record<string, Event> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement | null = null;

  _meta: TMeta;

  protected props: TProps;

  protected eventBus: () => EventBus;

  protected children: Record<string, Block> = {};

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
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag);
  }

  protected init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: T) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: T, newProps: T) {
    return true;
  }

  public setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _getChildren(propsAndChildren: T): {
    children: Record<string, Block>;
    props: Record<string, any>;
  } {
    const children: Record<string, Block> = propsAndChildren.children || {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach(eventName => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    this._removeEvents();
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected compile(template: string, context: any): DocumentFragment {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[key] = child.map(
          (child: Block) => `<div data-id="${child._id}"></div>`
        );
      } else {
        contextAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });
    const html = renderTemplate(template, contextAndStubs);
    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = html;
    const replaceStub = (component: Block) => {
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

  getContent(): HTMLElement {
    return this.element!;
  }

  private _makePropsProxy(props: TProps) {
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
    });
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
}
