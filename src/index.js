import {RenderLoginPage} from "./pages/login";
import {RenderRegistrationPage} from "./pages/registration";
import {RenderProfilePage} from "./pages/profile";

(function () {
    const root = document.getElementById("root");
    if (location.href.includes("/login")) {
        root.innerHTML = RenderLoginPage();
    }
    if (location.href.includes("/registration")) {
        root.innerHTML = RenderRegistrationPage();
    }
    if (location.href.includes("/profile")) {
        root.innerHTML = RenderProfilePage();
    }
})();
