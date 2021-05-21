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

  const rate = inputter("rate", (it) => ({ rate: Number(it) }));
  const pitch = inputter("pitch", (it) => ({ pitch: Number(it) }));
  form.append(voicePicker(), rate, pitch, controller());
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

const voicePicker = () => {
  const label = document.createElement("label");
  label.textContent = "voice";
  const select = document.createElement("select");
  select.addEventListener("change", () => {
    UtteranceParameter.update({ voice: select.value });
    speaker.reSpeakCurrent();
  });

  const populateVoiceList = () => {
    select.childNodes.forEach((it) => it.remove());
    window.speechSynthesis.getVoices().forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = voice.name + (voice.default ? " -- DEFAULT" : "");
      option.value = voice.voiceURI;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      select.appendChild(option);
    });
  };
  populateVoiceList();
  window.speechSynthesis.addEventListener("voiceschanged", populateVoiceList);

  label.append(select);
  return label;
};

const inputter = <Key extends keyof UtteranceParameter>(
  name: Key,
  convert: (value: string) => Record<Key, UtteranceParameter[Key]>
) => {
  const label = document.createElement("label");
  label.textContent = name;

  const onChange = (event: HTMLElementEventMap["input"]) => {
    const target = event.target as HTMLInputElement;
    UtteranceParameter.update({ ...convert(target.value) });
    speaker.reSpeakCurrent();
  };
  const direct = document.createElement("input");
  direct.type = "number";
  direct.step = "0.01";
  direct.value = `${UtteranceParameter.get()[name]}`;
  direct.addEventListener("change", onChange);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "10";
  slider.step = "0.1";
  slider.value = direct.value;
  slider.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    direct.value = target.value;
  });
  slider.addEventListener("change", onChange);

  label.append(direct, slider);
  return label;
};
