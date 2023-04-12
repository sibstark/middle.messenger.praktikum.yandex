import { render, isEqual, TProps, Block } from "@utils";
import { IRootQuery } from "@types";

export class Route {
  private _pathname: string;

  private readonly _blockClass: new () => Block<TProps>;

  private _block: Block | null;

  protected readonly _props: IRootQuery;

  constructor(
    pathname: string,
    view: new () => Block<TProps>,
    props: IRootQuery
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public get path() {
    return this._pathname;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.unmount();
    }
  }

  public match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    render(this._props.root, this._block);
    this._block.dispatchComponentDidMount();
    this._block.show();
  }
}
