import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";

export const settingsMenuButton = (): HTMLAnchorElement => {
  return button();
};

const button = () => {
  let inMenu = false;
  const menu = settingsMenu();
  const button = buttonInNavigatorBase();
  button.title = "speak: settings";
  button.textContent = "⚙️";
  button.addEventListener("click", () => {
    menu.style.visibility = inMenu ? "hidden" : "visible";
    inMenu = !inMenu;
  });
  button.append(menu);
  return button;
};

const settingsMenu = () => {
  const container = document.createElement("div");
  container.style.visibility = "hidden";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.right = "0";
  container.style.bottom = "0";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";

  const modal = document.createElement("div");
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.style.background = "black";

  modal.append(rateSlider());
  container.append(modal);
  return container;
};

const rateSlider = () => {
  const label = document.createElement("label");
  label.textContent = "rate";
  const input = document.createElement("input");
  input.type = "range";
  input.name = "rate";
  input.min = "0";
  input.max = "10";
  input.step = "0.1";
  input.value = "1";

  label.append(input);
  return label;
};
