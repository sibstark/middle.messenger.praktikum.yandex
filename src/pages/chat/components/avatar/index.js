import template from "bundle-text:./avatar.hbs";
import {renderTemplate} from "../../../../utils";
import "./avatar.css";

export const Avatar = () => {
    return renderTemplate(template, {});
};
