import { Router } from "@utils";
import { Link } from "./link";
import { LinkProps } from "./types";

export class RouteLink extends Link {
  router = new Router();

  constructor(props: LinkProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  protected init() {
    super.init();
    this.props.events = {
      ...(this.props.events || {}),
      click: this.onClick.bind(this)
    };
  }

  onClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.router.go(this.props.href);
  }
}
