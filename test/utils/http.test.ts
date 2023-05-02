import { expect } from "chai";
import { HTTPTransport } from "@utils";
import sinon from "sinon";
import { afterEach } from "mocha";

describe("HTTPTransport tests", () => {
  beforeEach(() => {
    // @ts-ignore
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  });

  afterEach(() => {
    // @ts-ignore
    global.XMLHttpRequest!.restore();
  });

  it("Should make correct url", async () => {
    const url = "/method";
    const http = new HTTPTransport(url);
    let request: any;
    // @ts-ignore
    global.XMLHttpRequest.onCreate = xhr => {
      request = xhr;
    };
    http.post("", {
      data: {}
    });

    expect(request.url).to.equal("https://ya-praktikum.tech/api/v2/method");
  });

  // eslint-disable-next-line func-names
  it("Should throw an error if the request fails", async function () {
    const url = "/method";
    const http = new HTTPTransport(url);
    let request: any;
    // @ts-ignore
    global.XMLHttpRequest.onCreate = xhr => {
      request = xhr;
    };

    http.get("").catch(err => {
      expect(err.status).to.equal(500);
    });
    request.respond(500, {}, "500 error");
  });

  describe("post tests", () => {
    it("Should send a POST request with the provided data", async () => {
      const url = "";
      const data = { id: 1, name: "My Name" };
      const http = new HTTPTransport(url);
      let request: any;
      // @ts-ignore
      global.XMLHttpRequest.onCreate = xhr => {
        request = xhr;
      };
      http.post("", {
        data
      });
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });
  });

  describe("put tests", () => {
    it("Should send a PUT request the provided data", async () => {
      const url = "";
      const data = { id: 1, name: "My Name" };
      const http = new HTTPTransport(url);
      let request: any;
      // @ts-ignore
      global.XMLHttpRequest.onCreate = xhr => {
        request = xhr;
      };
      http.put("", {
        data
      });
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });
  });

  describe("get tests", () => {
    it("Should get a GET request with data data", async () => {
      const url = "";
      const data = { id: 1, name: "My Name" };
      const http = new HTTPTransport(url);
      let request: any;
      // @ts-ignore
      global.XMLHttpRequest.onCreate = xhr => {
        request = xhr;
      };
      http
        .get("", {
          data
        })
        .then(response => {
          expect(response).to.equal(data);
        });
      request.respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(data)
      );
    });
  });
});
