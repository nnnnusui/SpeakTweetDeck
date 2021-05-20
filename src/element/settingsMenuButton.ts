import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { settingsMenu } from "./settingsMenu";

export const settingsMenuButton = (): HTMLAnchorElement => {
  return button();
};

const button = () => {
  let inMenu = false;
  const button = buttonInNavigatorBase();
  button.title = "speak: settings";
  button.textContent = "⚙️";
  button.addEventListener("click", () => {
    settingsMenu.style.visibility = inMenu ? "hidden" : "visible";
    inMenu = !inMenu;
  });
  return button;
};
