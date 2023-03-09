import template from "bundle-text:./link.hbs";
import {renderTemplate} from "../../utils";
import "./link.css";

export const Link = ({href, externalClasses, text}) => {
    return renderTemplate(template, {href, externalClasses, text});
};