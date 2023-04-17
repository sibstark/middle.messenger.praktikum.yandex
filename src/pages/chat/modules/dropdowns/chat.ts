import { Block } from "@utils";
import { Events } from "@types";
import { Dropdown, DropdownItem } from "../../components";

const template = `<svg width="3" height="15" viewBox="0 0 3 15" 
fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="black"/>
        <circle cx="1.5" cy="7.5" r="1.5" fill="black"/>
        <circle cx="1.5" cy="13.5" r="1.5" fill="black"/>
    </svg>`;

const Plus = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" 
xmlns="http://www.w3.org/2000/svg">
        <line x1="11" y1="5.5" x2="11" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
        <line x1="5.5" y1="11" x2="16.5" y2="11" stroke="#3369F3" stroke-width="1.5"/>
        <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
    </svg>`;

const Cross = `<svg width="22" height="22" viewBox="11 11 22 22" fill="none" 
xmlns="http://www.w3.org/2000/svg">
        <line x1="18.1108" y1="18.111" x2="25.8889" y2="25.8892" stroke="#3369F3" 
        stroke-width="1.5"/>
        <line x1="18.1108" y1="25.8891" x2="25.889" y2="18.1109" stroke="#3369F3" 
        stroke-width="1.5"/>
        <circle cx="22" cy="22" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
    </svg>`;

class ThreeDots extends Block<Events> {
  constructor(props: Events) {
    super("svg", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export class ChatActions extends Dropdown {
  triggered = false;

  constructor() {
    const trigger = new ThreeDots({});
    const add = new DropdownItem({
      icon: Plus,
      title: "Добавить пользователя"
    });
    const remove = new DropdownItem({
      icon: Cross,
      title: "Удалить пользователя"
    });
    super({
      content: [add, remove],
      trigger
    });
    trigger.setProps({
      events: {
        click: () => {
          this.setProps({
            classes: this.triggered ? "" : "dropdown_active"
          });
          this.triggered = !this.triggered;
        }
      }
    });
  }
}
