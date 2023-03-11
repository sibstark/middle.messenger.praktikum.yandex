import template from "bundle-text:./upload-photo.hbs";
import {Button} from "../../../../components";
import {renderTemplate} from "../../../../utils";
import "./upload-photo.css";

export const UploadPhoto = ({content}) => {
    const button = Button({
        type: "button",
        text: "Save", externalClasses: "button_blue button_full-width"
    });
    return renderTemplate(template, {button, content});
};
