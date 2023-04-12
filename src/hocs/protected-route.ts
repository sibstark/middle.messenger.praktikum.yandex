import { Block, store, StoreEvents, TProps, Route, Router } from "@utils";
import { IRootQuery, TStore } from "@types";

function connectUser(store: TStore) {
  return store.user;
}

export class ProtectedRoute extends Route {
  user: any;

  router: Router;

  constructor(
    pathname: string,
    view: new () => Block<TProps>,
    props: IRootQuery
  ) {
    super(pathname, view, props);
    this.user = connectUser(store.getState());
    this.router = new Router();
    store.on(StoreEvents.Updated, () => {
      this.user = connectUser(store.getState());
      this.render();
    });
  }

  public render() {
    super.render();
  }
}
