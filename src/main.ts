import { Tweet } from "./tweet";

const run = () => {
  initAddSpeakButton();
  registerObserver();
  console.log("SpeakTweetDeck: loaded.");
};
setTimeout(run, 8000);

const initAddSpeakButton = () =>
  Array.from(document.getElementsByClassName("tweet")).forEach((it) =>
    addSpeakButton(it)
  );

const registerObserver = () => {
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
  if (isSpeakTarget(tweetElement)) speak(tweetElement);
  addSpeakButton(tweetElement);
};

const isSpeakTarget = (tweetElement: Element) => true;
const speak = (tweetElement: Element) => {
  const tweet = Tweet.fromElement(tweetElement);
  const utterance = utteranceFromTweet(tweet);
  window.speechSynthesis.speak(utterance);
};

const utteranceFromTweet = (tweet: Tweet) => {
  const utterance = new SpeechSynthesisUtterance(
    `${tweet.timeline}\n ${tweet.username}\n ${tweet.text}`
  );
  utterance.rate = 1.6;
  return utterance;
};

const addSpeakButton = (tweetElement: Element) => {
  const actionList = tweetElement.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = document.createElement("a");
  button.href = "#";
  button.rel = "speak";
  button.classList.add("tweet-action");
  button.textContent = "🔈";
  button.onclick = () => speak(tweetElement);
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};
