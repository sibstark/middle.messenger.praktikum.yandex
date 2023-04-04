import { ErrorContainer, Page } from "@modules";
import { Main } from "@components";

export class Render500Page extends Page {
  constructor() {
    const container = new ErrorContainer({
      body: "Something went wrong",
      code: 500,
      classes: "error-container_danger"
    });
    const main = new Main({
      body: container
    });
    super({
      body: main,
      classes: "page_centered"
    });
  }
}
