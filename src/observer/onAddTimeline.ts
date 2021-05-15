import { onDetectTweet } from "./onDetectTweet";
import { onUpdateTimeline } from "./onUpdateTimeline";

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    mutation.addedNodes.forEach((it) => {
      onUpdateTimeline.set(it);
      const tweetContainers = Array.from(
        (it as Element).getElementsByClassName("chirp-container")
      );
      tweetContainers.forEach(onDetectTweet.set);
    })
  )
);

export const onAddTimeline = {
  set: (it: Node): void => {
    observer.observe(it, { childList: true });
  },
  observer,
};
