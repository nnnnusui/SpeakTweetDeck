import { speaker } from "../speaker";
import { GlobalMute } from "../type/GlobalMute";
import { UtteranceParameter } from "../type/UtteranceParameter";
import { buttonInNavigatorBase } from "./base/buttonInNavigatorBase";
import { globalMuteButton } from "./globalMuteButton";
import { suppressButton } from "./suppressButton";

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

  centering.append(buttonIcon(), statusBadge());
  button.append(centering);
  return button;
};

const buttonIcon = () => {
  const icon = document.createElement("span");
  icon.textContent = "⚙️";
  return icon;
};
const statusBadge = () => {
  const element = document.createElement("span");
  element.textContent = GlobalMute.get() ? "🔇" : "🔊";
  GlobalMute.addListener((mute) => (element.textContent = mute ? "🔇" : "🔊"));
  element.style.fontSize = ".5em";
  element.style.position = "absolute";
  element.style.bottom = "0";
  element.style.right = "0";
  return element;
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

  form.append(rateSlider(), controller());
  return form;
};

const controller = () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.justifyContent = "space-around";
  container.append(globalMuteButton(), suppressButton());
  return container;
};

const rateSlider = () => {
  const label = document.createElement("label");
  label.textContent = "rate";
  const slider = document.createElement("input");
  slider.type = "range";
  slider.name = "rate";
  slider.min = "0";
  slider.max = "10";
  slider.step = "0.1";
  slider.value = "1";

  slider.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    UtteranceParameter.update({ rate: Number(target.value) });
    speaker.reSpeakCurrent();
  });

  label.append(slider);
  return label;
};
