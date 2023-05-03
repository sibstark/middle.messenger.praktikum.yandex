import { expect } from "chai";
import sinon from "sinon";
import { Router } from "./router";
import { Block } from "./block";

describe("Router tests", () => {
  function makeRouter() {
    return new Router();
  }
  it("Router should go to direct page", () => {
    const router = makeRouter();
    router.go("/sign-up");
    expect(window.location.pathname).to.be.equal("/sign-up");
  });

  it("Router should go back to necessary page", () => {
    const router = makeRouter();
    const backStub = sinon.stub();
    const originalBack = window.history.back;
    window.history.back = backStub;
    router.go("/sign-up");
    router.back();
    window.history.back = originalBack;
    expect(backStub.calledOnce).to.be.true;
  });

  it("Router should return route by defined route path", () => {
    const router = makeRouter();
    router.use("/test", Block);
    expect(router.getRoute("/test") !== undefined).to.be.true;
  });
});
