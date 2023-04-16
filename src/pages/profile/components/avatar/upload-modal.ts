import { Button, Input, Modal } from "@components";
import { userController } from "@controllers";
import { UploadPhoto } from "../upload-photo";

export class UploadModal extends Modal {
  constructor() {
    const choose = new Input({
      type: "file",
      accept: ".jpg, .png"
    });
    const button = new Button({
      type: "button",
      text: "Upload",
      classes: "button_blue button_full-width",
      events: {
        click: async (e: MouseEvent) => {
          e.stopPropagation();
          const file = (choose.getContent() as HTMLInputElement).files?.[0];
          if (file) {
            const action = await userController.changeAvatar(file);
            if (action.success) {
              this.setProps({
                classes: ""
              });
            }
          }
        }
      }
    });
    const uploadPhoto = new UploadPhoto({ content: choose, button });
    super({ content: uploadPhoto });
  }
}
