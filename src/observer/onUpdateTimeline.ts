import { addToggleSpeakButtonToTimeline } from "../injector/addToggleSpeakButtonToTimeline";

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    const timeline = mutation.target as Element;
    addToggleSpeakButtonToTimeline(timeline);
  })
);

export const onUpdateTimeline = {
  set: (it: Node): void => {
    observer.observe(it, {
      attributes: true,
    });
  },
  observer,
};
