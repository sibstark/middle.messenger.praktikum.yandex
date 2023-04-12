import { Block, Router, Tag, TProps } from "@utils";

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<TProps> ? TProps : any;

  return class WithRouter extends Component {
    constructor(tag: Tag, props: Props & PropsWithRouter) {
      super(tag, { ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
