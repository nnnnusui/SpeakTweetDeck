import { onUpdateTimeline } from "./onUpdateTimeline";

const observer = new MutationObserver((mutations) =>
mutations.forEach((mutation) =>
  mutation.addedNodes.forEach(onUpdateTimeline.set)
)
);

export const onAddTimeline = {
  set: (it: Node): void => {
    observer.observe(it, { childList: true })
  },
  observer,
};