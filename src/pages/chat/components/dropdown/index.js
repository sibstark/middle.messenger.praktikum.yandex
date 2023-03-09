import template from "bundle-text:./dropdown.hbs";
import {renderTemplate} from "../../../../utils";
import "./dropdown.css";

export const Dropdown = ({externalClasses, trigger, position, content}) => {
    return renderTemplate(template, {externalClasses, trigger, position, content});
};

export * from "./dropdown-item";