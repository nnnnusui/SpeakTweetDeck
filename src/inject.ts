import { globalMuteButton } from "./element/globalMuteButton";
import { settingsMenu } from "./element/settingsMenu";
import { settingsMenuButton } from "./element/settingsMenuButton";
import { suppressButton } from "./element/suppressButton";
import { addPlayButtonToTweet } from "./injector/addPlayButtonToTweet";
import { addToggleSpeakButtonToTimeline } from "./injector/addToggleSpeakButtonToTimeline";
import { onAddTimeline } from "./observer/onAddTimeline";
import { onDetectTweet } from "./observer/onDetectTweet";
import { onUpdateTimeline } from "./observer/onUpdateTimeline";

export const inject = (): void => {
  const navigator = document.getElementsByClassName("app-navigator")[0];
  if (!navigator) throw Error("html class: 'app-navigator' not found.");
  const timelinesContainer = document.getElementsByClassName("app-columns")[0];
  if (!timelinesContainer) throw Error("html class: 'app-columns' not found.");
  const timelines = Array.from(timelinesContainer.children);
  const tweets = Array.from(document.getElementsByClassName("tweet"));

  navigator.prepend(
    settingsMenu,
    settingsMenuButton(),
    globalMuteButton(),
    suppressButton()
  );
  timelines.forEach(addToggleSpeakButtonToTimeline);
  tweets.forEach(addPlayButtonToTweet);

  const tweetContainers = Array.from(
    document.getElementsByClassName("chirp-container")
  );
  onAddTimeline.set(timelinesContainer);
  timelines.forEach(onUpdateTimeline.set);
  tweetContainers.forEach(onDetectTweet.set);
};
