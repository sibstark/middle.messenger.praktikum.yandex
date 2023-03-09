import {RenderLoginPage} from "./pages/login";
import {RenderRegistrationPage} from "./pages/registration";

(function () {
    const root = document.getElementById("root");
    if (location.href.includes("/login")) {
        root.innerHTML = RenderLoginPage();
    }
    if (location.href.includes("/registration")) {
        root.innerHTML = RenderRegistrationPage();
    }
})();
