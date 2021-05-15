import { Button } from "../type/Button";
import { buttonBase } from "./buttonBase";

export const buttonInNavigatorBase = (): Button => {
  const base = buttonBase();
  base.style.display = "flex";
  base.style.justifyContent = "center";
  base.style.fontSize = "2em";
  base.style.marginBottom = ".2em";
  return base;
};
