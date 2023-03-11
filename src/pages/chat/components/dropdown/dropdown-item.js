import template from "bundle-text:./dropdown-item.hbs";
import {renderTemplate} from "../../../../utils";
import "./dropdown-item.css";

export const DropdownItem = ({icon, title}) => {
    return renderTemplate(template, {icon, title});
};
