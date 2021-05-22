import { speaker } from "../speaker";
import { GlobalMute } from "../type/GlobalMute";
import { UtteranceParameter } from "../type/UtteranceParameter";
import { globalMuteButton } from "./globalMuteButton";
import { suppressButton } from "./suppressButton";

export const settingsMenuButton = (): HTMLDivElement => {
  const container = document.createElement("div");
  container.classList.add("speak-tweet-deck", "settings");
  const settingsMenu = menu();
  container.append(button(settingsMenu), settingsMenu);
  return container;
};

const button = (menu: HTMLElement) => {
  let inMenu = false;
  const button = document.createElement("a");
  button.classList.add("button", "link-clean");
  button.href = "#";
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
  element.classList.add("status-badge");
  element.textContent = GlobalMute.get() ? "🔇" : "🔊";
  GlobalMute.addListener((mute) => (element.textContent = mute ? "🔇" : "🔊"));
  return element;
};

const menu = () => {
  const modal = document.createElement("section");
  modal.classList.add("menu");
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modal.append(speaker.previewer, form());
  return modal;
};

const form = () => {
  const form = document.createElement("form");

  const rate = inputter("rate", (it) => ({ rate: Number(it) }), 10);
  const pitch = inputter("pitch", (it) => ({ pitch: Number(it) }), 2);
  const volume = inputter("volume", (it) => ({ volume: Number(it) }), 1);
  form.append(voicePicker(), rate, pitch, volume, controller());
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
  convert: (value: string) => Record<Key, UtteranceParameter[Key]>,
  max?: number
) => {
  const label = document.createElement("label");
  label.textContent = name;
  label.style.position = "relative";

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
  slider.step = "0.01";
  slider.min = "0";
  if (max) slider.max = `${max}`;
  slider.value = direct.value;
  slider.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    direct.value = target.value;
  });
  slider.addEventListener("change", onChange);

  label.append(direct, slider);
  return label;
};
