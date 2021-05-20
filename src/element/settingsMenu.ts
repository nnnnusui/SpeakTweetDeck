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

export const settingsMenu = (() => {
  const container = document.createElement("div");
  container.style.visibility = "hidden";
  container.style.position = "fixed";
  container.style.left = "60px";
  container.style.bottom = "0";
  container.style.display = "flex";

  const modal = document.createElement("div");
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.style.background = "black";

  modal.append(speaker.previewer, rateSlider());
  container.append(modal);
  return container;
})();
