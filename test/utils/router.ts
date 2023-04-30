import { expect } from "chai";
import { Router, Block } from "@utils";

describe("Router tests", () => {
  function makeRouter() {
    return new Router();
  }
  it("Router should go to direct page", () => {
    const router = makeRouter();
    router.go("/sign-up");
    expect(window.location.pathname).to.be("/sign-up");
  });

  it("Router should go back to necessary page", () => {
    const router = makeRouter();
    router.go("/sign-up");
    setTimeout(() => {
      router.back();
      expect(window.location.pathname).to.be("/");
    }, 1000);
  });

  it("Router should return route by defined route path", () => {
    const router = makeRouter();
    router.use("/test", Block);
    expect(router.getRoute("/test") !== undefined).to.be.true;
  });
});
