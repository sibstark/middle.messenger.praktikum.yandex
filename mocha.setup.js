const { JSDOM } = require("jsdom");

const { window } = new JSDOM("<div id='root'></div>", {
  url: "http://localhost:3000/"
});

global.window = window;
global.DocumentFragment = window.DocumentFragment;
global.document = window.document;
