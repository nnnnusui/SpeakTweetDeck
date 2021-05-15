/* eslint-disable no-extra-boolean-cast */
import { addSpeakButton } from "./addSpeakButton";
import { addSuppressButton } from "./addSuppressButton";
import { addToggleSpeakButtonToTimelines } from "./addToggleSpeakButtonToTimelines";
import { Tweet } from "./Tweet";
import { WhiteList } from "./WhiteList";
import { addGlobalMuteButton } from "./addGlobalMuteButton";
import { speak } from "./speak";

const secondsToWaitForLoad = 5;
setTimeout(() => {
  localStorage.setItem("mute", false.toString());
  addSuppressButton();
  addGlobalMuteButton();
  addToggleSpeakButtonToTimelines();
  addSpeakButtonToExistingTweets();
  registerTweetObserver();
  console.log("SpeakTweetDeck: loaded.");
}, secondsToWaitForLoad * 1000);

const addSpeakButtonToExistingTweets = () =>
  Array.from(document.getElementsByClassName("tweet")).forEach((it) =>
    addSpeakButton(it, () => speak(Tweet.fromElement(it)))
  );

const registerTweetObserver = () => {
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) =>
      Array.from(mutation.addedNodes)
        .reverse()
        .forEach((it) => onDetectTweet(it as Element))
    )
  );
  Array.from(document.getElementsByClassName("chirp-container")).forEach((it) =>
    observer.observe(it, { childList: true })
  );
};

const onDetectTweet = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const tweet = Tweet.fromElement(tweetElement);
  addSpeakButton(tweetElement, () => speak(tweet));
  if (!isSpeakTarget(tweet)) return;
  const mute = localStorage.getItem("mute") === true.toString();
  if (mute) return;
  speak(tweet);
};

const isSpeakTarget = (tweet: Tweet) => WhiteList.check(tweet);
