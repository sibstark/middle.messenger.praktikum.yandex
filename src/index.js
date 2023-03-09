import {RenderLoginPage} from "./pages/login";
import {RenderRegistrationPage} from "./pages/registration";
import {RenderProfilePage} from "./pages/profile";
import {Render404Page} from "./pages/404";
import {Render500Page} from "./pages/500";

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
    if (location.href.includes("/not-found")) {
        root.innerHTML = Render404Page();
    }
    if (location.href.includes("/server-error")) {
        root.innerHTML = Render500Page();
    }
})();
