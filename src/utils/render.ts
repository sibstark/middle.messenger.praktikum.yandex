import Handlebars from "handlebars";
import { IRenderer } from "@types";

export function renderTemplate(
  template: string,
  context: Record<string, string | any>
): string {
  console.log("hbs template", template);
  // @ts-ignore
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(context);
}

export function render(query: string, block: IRenderer) {
  const root = document.getElementById(query) as HTMLElement;
  root.append(block.getContent());
}
