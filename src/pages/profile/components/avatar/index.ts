import { Block, connect } from "@utils";
import { connectUser } from "@connectors";
import template from "./avatar.hbs";
import { ProfileAvatarProps } from "./types";
import { UploadModal } from "./upload-modal";
import "./avatar.css";

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
    return oldProps.user?.avatar !== newProps.user?.avatar;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default connect(connectUser)(ProfileAvatar);
