import { inject } from "./inject";

const secondsToWaitForLoad = 5;
setTimeout(() => {
  localStorage.setItem("mute", false.toString());
  inject();
  console.log("SpeakTweetDeck: loaded.");
}, secondsToWaitForLoad * 1000);
