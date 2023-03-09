import { RenderLoginPage } from "./pages/login";

(function () {
    const root = document.getElementById("root");
    if (location.href.includes("/login")) {
        root.innerHTML = RenderLoginPage();
    }
})();
