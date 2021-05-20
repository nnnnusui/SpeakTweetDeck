import { speaker } from "../speaker";
import { GlobalMute } from "../type/GlobalMute";
import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";

export const settingsMenuButton = (): HTMLDivElement => {
  const container = document.createElement("div");
  const settingsMenu = menu();
  container.append(button(settingsMenu), settingsMenu);
  return container;
};

const button = (menu: HTMLElement) => {
  let inMenu = false;
  const button = buttonInNavigatorBase();
  button.title = "speak: settings";

  const centering = document.createElement("div");
  centering.style.position = "relative";

  button.addEventListener("click", () => {
    menu.style.left = `${button.clientWidth}px`;
    menu.style.visibility = inMenu ? "hidden" : "visible";
    inMenu = !inMenu;
  });

  centering.append(buttonIcon(), statusIcon());
  button.append(centering);
  return button;
};

const buttonIcon = () => {
  const icon = document.createElement("span");
  icon.textContent = "⚙️";
  return icon;
};
const statusIcon = () => {
  const icon = document.createElement("span");
  icon.textContent = GlobalMute.get() ? "🔇" : "🔊";
  GlobalMute.addListener((mute) => (icon.textContent = mute ? "🔇" : "🔊"));
  icon.style.fontSize = ".5em";
  icon.style.position = "absolute";
  icon.style.bottom = "0";
  icon.style.right = "0";
  return icon;
};

const menu = () => {
  const container = document.createElement("div");
  container.style.visibility = "hidden";
  container.style.position = "fixed";
  container.style.bottom = "0";

  const modal = document.createElement("div");
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.style.borderStyle = "double";
  modal.style.borderWidth = ".2em";

  modal.append(speaker.previewer, form());
  container.append(modal);
  return container;
};

const form = () => {
  const form = document.createElement("form");
  form.style.background = "black";

  form.append(rateSlider());
  return form;
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
