import { ErrorContainer, Page } from "@modules";
import { Main } from "@components";

export class Render404Page extends Page {
  constructor() {
    const container = new ErrorContainer({ body: "Not found", code: 404 });
    const main = new Main({
      body: container
    });
    super({
      body: main,
      classes: "page_centered"
    });
  }
}
