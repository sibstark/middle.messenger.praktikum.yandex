import Handlebars from "handlebars";

export function renderTemplate(
  template: string,
  context: Record<string, string | any>
): string {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(context);
}

export function concatArrayTemplates<T>(list: T[]) {
  return list.join("");
}
