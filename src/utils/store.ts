import { User } from "@types";
import { EventBus } from "./event-bus";
import { cloneDeep, isEqual, set } from "./object";
import { Block } from "./block";

export type WithFetching<T> = T & {
  fetching: boolean;
};

export type UserStore = WithFetching<{
  user: User | null;
}>;

export type TStore = {
  user: UserStore;
};
export enum StoreEvents {
  Updated = "updated"
}
class Store extends EventBus {
  private state: TStore = {
    user: {
      user: null,
      fetching: false
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
  // используем class expression
  return (Component: any) => {
    return class extends Component {
      constructor(...args: any) {
        let state = cloneDeep(mapStateToProps(store.getState()));
        super(...args, state);

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const newState = cloneDeep(mapStateToProps(store.getState()));
          // вызываем обновление компонента, передав данные из хранилища
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    } as typeof Block;
  };
}

// isEgual нужно дергать в componentDidUpdate и если пропсы изменились
// то только тогда возвращать true

export const store = new Store();
