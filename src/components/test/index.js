import Handlebars from "handlebars";
import template from "bundle-text:./test.hbs";

export const Test = () => {
    const compiled_template = Handlebars.compile(template);
    return compiled_template({name: "Luke", power: "force"});
};