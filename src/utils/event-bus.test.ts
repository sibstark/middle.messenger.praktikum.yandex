import { expect } from "chai";
import sinon from "sinon";
import { EventBus } from "./event-bus";

describe("EventBus tests", () => {
  describe("on", () => {
    it("Should add a callback to the listeners array for the specified event", () => {
      const eventBus = new EventBus();
      const callback = () => {};
      eventBus.on("testEvent", callback);
      expect(eventBus.listeners)
        .to.have.property("testEvent")
        .that.is.an("array")
        .with.lengthOf(1);
      expect(eventBus.listeners.testEvent[0]).to.equal(callback);
    });
  });

  describe("off", () => {
    it("Should remove a callback from the listeners array for the specified event", () => {
      const eventBus = new EventBus();
      const callback1 = () => {};
      const callback2 = () => {};
      eventBus.on("testEvent", callback1);
      eventBus.on("testEvent", callback2);
      eventBus.off("testEvent", callback1);
      expect(eventBus.listeners)
        .to.have.property("testEvent")
        .that.is.an("array")
        .with.lengthOf(1);
      expect(eventBus.listeners.testEvent[0]).to.equal(callback2);
    });

    it("Should remove the event from the listeners object if there are no callbacks left", () => {
      const eventBus = new EventBus();
      const callback = () => {};
      eventBus.on("testEvent", callback);
      eventBus.off("testEvent", callback);
      expect(eventBus.listeners.testEvent).to.be.undefined;
    });
  });

  describe("emit", () => {
    it("Should call all the callbacks for the specified event with the provided arguments", () => {
      const eventBus = new EventBus();
      const callback1 = sinon.fake();
      const callback2 = sinon.fake();
      eventBus.on("testEvent", callback1);
      eventBus.on("testEvent", callback2);
      eventBus.emit("testEvent", "arg1", "arg2");
      expect(callback1.calledOnceWithExactly("arg1", "arg2")).to.be.true;
      expect(callback2.calledOnceWithExactly("arg1", "arg2")).to.be.true;
    });

    it("Should throw an error if there are no callbacks for the specified event", () => {
      const eventBus = new EventBus();
      expect(() => eventBus.emit("testEvent")).to.throw("No event: testEvent");
    });
  });
});
