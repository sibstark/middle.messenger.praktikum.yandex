import template from "bundle-text:./link.hbs";
import {renderTemplate} from "../../utils/index.js";
import "./link.css";

export const Link = ({href, externalClasses, text}) => {
    return renderTemplate(template, {href, externalClasses, text});
};