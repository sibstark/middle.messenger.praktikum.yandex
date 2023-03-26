/* eslint-disable max-len */
import { Dropdown, DropdownItem } from "../../components";

const ThreeDots = `<svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="black"/>
        <circle cx="1.5" cy="7.5" r="1.5" fill="black"/>
        <circle cx="1.5" cy="13.5" r="1.5" fill="black"/>
    </svg>`;

const Plus = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="11" y1="5.5" x2="11" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
        <line x1="5.5" y1="11" x2="16.5" y2="11" stroke="#3369F3" stroke-width="1.5"/>
        <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
    </svg>`;

const Cross = `<svg width="22" height="22" viewBox="11 11 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18.1108" y1="18.111" x2="25.8889" y2="25.8892" stroke="#3369F3" stroke-width="1.5"/>
        <line x1="18.1108" y1="25.8891" x2="25.889" y2="18.1109" stroke="#3369F3" stroke-width="1.5"/>
        <circle cx="22" cy="22" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
    </svg>`;

const Clip = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7.18661 13.5L14.7628 5.92389L15.7056 6.8667L8.12942 14.4428L7.18661 13.5Z" fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.70065 16.0142L17.2768 8.43805L18.2196 9.38086L10.6435 16.957L9.70065 16.0142Z" fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15.0433 21.3565L22.6194 13.7803L23.5623 14.7231L15.9861 22.2993L15.0433 21.3565Z" fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.5573 23.8706L25.1335 16.2945L26.0763 17.2373L18.5001 24.8134L17.5573 23.8706Z" fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10829 23.8919C5.50479 21.2884 5.51421 17.0579 8.12933 14.4428L7.18652 13.5C4.04838 16.6381 4.03708 21.7148 7.16127 24.839C10.2855 27.9632 15.3621 27.9518 18.5002 24.8137L17.5574 23.8709Z"
              fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z"
              fill="#3369F3"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.70093 16.0146C7.95752 17.7581 7.95123 20.5784 9.6869 22.3141C11.4226 24.0497 14.2429 24.0435 15.9863 22.3L15.0435 21.3572C13.8231 22.5776 11.8489 22.582 10.6339 21.3671C9.41895 20.1521 9.42335 18.1778 10.6437 16.9575L9.70093 16.0146Z"
              fill="#3369F3"/>
    </svg>`;

const File = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z"
              fill="#3369F3"/>
    </svg>`;

const Media = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z"
              fill="#3369F3"/>
    </svg>`;
const Round = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z"
              fill="#3369F3"/>
    </svg>`;
export const MembersAction = () => {
  const add = new DropdownItem({ icon: Plus, title: "Добавить пользователя" });
  const remove = new DropdownItem({ icon: Cross, title: "Удалить пользователя" });
  return new Dropdown({
    classes: "dropdown_active",
    trigger: ThreeDots,
    content: [add, remove]
  });
};

export const MessageActions = () => {
  const addMedia = new DropdownItem({ icon: Media, title: "Фото или Видео" });
  const addFile = new DropdownItem({ icon: File, title: "Файл" });
  const addLocation = new DropdownItem({ icon: Round, title: "Локация" });
  const position = "dropdown__content_position-top dropdown__content_position-right";
  return new Dropdown({
    classes: "dropdown_active",
    trigger: Clip,
    content: [addMedia, addFile, addLocation],
    position
  });
};
