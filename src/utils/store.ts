import { EventBus } from "./event-bus";
import { Block, Tag } from "./block";
import { isEqual, set } from "./object";

export enum StoreEvents {
  Updated = "updated"
}
class Store extends EventBus {
  private state: Record<string, unknown> = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}
export function connect(
  mapStateToProps: (state: Record<string, unknown>) => Record<string, unknown>
) {
  // используем class expression
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(tag: Tag, props: Record<string, unknown>) {
        let state = mapStateToProps(store.getState());
        super(tag, { ...props, ...mapStateToProps(store.getState()) });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          // вызываем обновление компонента, передав данные из хранилища
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}

// isEgual нужно дергать в componentDidUpdate и если пропсы изменились
// то только тогда возвращать true

export const store = new Store();
