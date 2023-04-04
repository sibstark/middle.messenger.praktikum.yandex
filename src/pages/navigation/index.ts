import { LinkProps, Main, Nav, Link } from "@components";
import { Page } from "@modules";
import { path } from "@routes";
import "./nav.css";

const linksMap: LinkProps[] = [
  {
    href: path.login,
    text: "Login form page",
    target: "_blank"
  },
  {
    href: path.registration,
    text: "Registration form page",
    target: "_blank"
  },
  {
    href: path.profile,
    text: "Profile form page",
    target: "_blank"
  },
  {
    href: path.notFound,
    text: "Not found (404) page",
    target: "_blank"
  },
  {
    href: path.serverError,
    text: "Serer error (500) page",
    target: "_blank"
  },
  {
    href: path.app,
    text: "Chat page",
    target: "_blank"
  },
  {
    href: path.nav,
    text: "Navigation (current) page",
    target: "_blank"
  }
];
export class RenderNavPage extends Page {
  constructor() {
    const links = linksMap.map(_ => new Link(_));
    const nav = new Nav({
      body: links,
      classes: "pages-navigation"
    });
    const main = new Main({
      body: nav
    });
    super({
      body: main,
      classes: "page_centered"
    });
  }
}
