import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { settingsMenu } from "./settingsMenu";

export const settingsMenuButton = (): HTMLDivElement => {
  const container = document.createElement("div");
  container.append(button(), settingsMenu);
  return container;
};

const button = () => {
  let inMenu = false;
  const button = buttonInNavigatorBase();
  button.title = "speak: settings";
  button.textContent = "⚙️";
  button.addEventListener("click", () => {
    settingsMenu.style.left = `${button.clientWidth}px`;
    settingsMenu.style.visibility = inMenu ? "hidden" : "visible";
    inMenu = !inMenu;
  });
  return button;
};
