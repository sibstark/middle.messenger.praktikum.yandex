import { expect } from "chai";
import { Block } from "@utils";
import sinon from "sinon";

describe("Block tests", () => {
  function blockFabric() {
    return new Block("div", {
      id: "test-block",
      class: "test-class"
    });
  }

  describe("constructor", () => {
    it("Should create a new instance of Block", () => {
      const testBlock = blockFabric();
      expect(testBlock).to.be.an.instanceOf(Block);
    });

    it("Should set the tag and props on the Block instance", () => {
      const testBlock = blockFabric();
      expect(testBlock._meta.tag).to.equal("div");
      expect(testBlock.props.id).to.equal("test-block");
      expect(testBlock.props.class).to.equal("test-class");
    });
  });

  describe("setProps", () => {
    it("should update the props on the Block instance", () => {
      const testBlock = blockFabric();
      testBlock!.setProps({ id: "new-id" });
      expect(testBlock!.props.id).to.equal("new-id");
    });
  });

  describe("componentDidMount", () => {
    it("should be called after the Block is initialized", () => {
      const componentDidMountStub = sinon.stub();
      class TestBlock extends Block {
        componentDidMount() {
          componentDidMountStub();
        }
      }
      const block = new TestBlock("div");
      block.componentDidMount();
      expect(componentDidMountStub.calledOnce).to.be.true;
    });
  });

  describe("componentDidUpdate", () => {
    it("should be called when the Block props are updated", () => {
      const componentDidUpdateStub = sinon.stub();
      class TestBlock extends Block {
        componentDidUpdate() {
          componentDidUpdateStub();
          return true;
        }
      }
      const testBlock = new TestBlock("div", { id: "test-id" });
      testBlock.setProps({ id: "new-id" });
      expect(componentDidUpdateStub.calledOnce).to.be.true;
    });
  });
});
