import { speaker } from "../speaker";

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

const form = () => {
  const form = document.createElement("form");
  form.style.background = "black";

  form.append(rateSlider());
  return form;
};

export const settingsMenu = (() => {
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
})();
