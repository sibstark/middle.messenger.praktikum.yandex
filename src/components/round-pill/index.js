import template from "bundle-text:./round-pill.hbs";
import {renderTemplate} from "../../utils";
import "./round-pill.css";

export const RoundPill = ({externalClasses, content}) => {
    return renderTemplate(template, {externalClasses, content});
};
