import { render, isEqual } from "@utils";
import { IRootQuery } from "@types";
import { TProps, Block } from "./block";

export class Route {
  private _pathname: string;

  private readonly _blockClass: new () => Block<TProps>;

  private _block: Block | null;

  private readonly _props: IRootQuery;

  constructor(pathname: string, view: new () => Block<TProps>, props: IRootQuery) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.root, this._block);
      // this._block.show();
      return;
    }

    this._block.show();
  }
}
