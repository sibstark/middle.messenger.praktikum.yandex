import Handlebars from "handlebars";

export function renderTemplate(template, context) {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(context);
}

export function concatArrayTemplates(list) {
    return list.join("");
}
