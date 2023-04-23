import { Chat, User } from "@types";
import { EventBus } from "./event-bus";
import { set } from "./object";
import { Block } from "./block";

export type WithFetching<T> = T & {
  fetching: boolean;
};

export type UserStore = WithFetching<{
  users: User[];
  user: User | null;
}>;

export type ChatsStore = WithFetching<{
  filter: string;
  chats: Chat[];
}>;

export type ChatStore = {
  users: User[];
  selected: Chat | null;
  messages: any[];
};

export type TStore = {
  user: UserStore;
  chats: ChatsStore;
  chat: ChatStore;
};
export enum StoreEvents {
  Updated = "updated"
}
class Store extends EventBus {
  private state: TStore = {
    user: {
      user: null,
      users: [],
      fetching: false
    },
    chats: {
      filter: "",
      chats: [],
      fetching: false
    },
    chat: {
      selected: null,
      messages: [],
      users: []
    }
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}
export function connect(mapStateToProps: (store: TStore) => any) {
  return (Component: any) => {
    return class extends Component {
      constructor(...args: any) {
        const props = mapStateToProps({ ...store.getState() });
        super(...args, { ...props });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const props = mapStateToProps({ ...store.getState() });
          this.setProps({ ...props });
        });
      }
    } as typeof Block;
  };
}

export const store = new Store();
