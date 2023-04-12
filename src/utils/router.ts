import { Block } from "@utils";
import { Route } from "./route";

export class Router {
  private _unknown = "*";

  private static __instance: Router;

  private readonly _rootQuery: string = "root";

  private history: History = window.history;

  private routes: Route[] = [];

  private _currentRoute: Route | null = null;

  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    if (rootQuery) {
      this._rootQuery = rootQuery;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  public get path() {
    return this._currentRoute?.path;
  }

  use(pathname: string, block: new () => Block) {
    // Вместо трёх точек напишем отдельную сущность — об этом речь пойдёт ниже
    const route = new Route(pathname, block, { root: this._rootQuery });

    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  useCustom(route: Route) {
    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = event => {
      if (event.currentTarget instanceof Window) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();

    // route.render(route, pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    return route || this.routes.find(route => route.match(this._unknown));
  }
}
