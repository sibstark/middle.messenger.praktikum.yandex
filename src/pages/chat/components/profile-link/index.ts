import { RouteLink } from "@components";
import { path } from "@routes";

const linkText = `<span class="chat-header-profile-nav__link-text">
                    Profile
                </span>
<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="#999999"/>
                </svg>`;
export class ProfileLink extends RouteLink {
  constructor() {
    super({
      text: linkText,
      classes: "chat-header-profile-nav__link",
      href: path.profile
    });
  }
}
