export const buttonBase = (): HTMLAnchorElement => {
  const base = document.createElement("a");
  base.href = "#";
  base.classList.add("link-clean");
  return base;
};
