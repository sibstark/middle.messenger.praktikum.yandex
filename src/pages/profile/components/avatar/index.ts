import { Block, connect, TStore } from "@utils";
import template from "./avatar.hbs";
import { ProfileAvatarProps } from "./types";
import { UploadModal } from "./upload-modal";
import "./avatar.css";

function connector(store: TStore): { avatar: string | undefined } {
  return {
    avatar: store.user.user?.avatar
  };
}
class ProfileAvatar extends Block<ProfileAvatarProps> {
  constructor(props: Omit<ProfileAvatarProps, "modal">) {
    const modal = new UploadModal();
    super("div", {
      ...props,
      events: {
        click: () => {
          modal.setProps({
            classes: "modal_active"
          });
        }
      },
      modal
    });
  }

  componentDidUpdate(
    oldProps: ProfileAvatarProps,
    newProps: ProfileAvatarProps
  ): boolean {
    return oldProps?.avatar !== newProps?.avatar;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default connect(connector)(ProfileAvatar);
