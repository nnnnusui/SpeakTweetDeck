import { Tweet } from "./Tweet";

const run = () => {
  initAddSpeakButton();
  registerObserver();
  console.log("SpeakTweetDeck: loaded.");
};
setTimeout(run, 8000);

const initAddSpeakButton = () =>
  Array.from(document.getElementsByClassName("tweet")).forEach((it) =>
    addSpeakButton(it, () => speak(Tweet.fromElement(it)))
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
  const tweet = Tweet.fromElement(tweetElement);
  if (isSpeakTarget(tweet)) speak(tweet);
  addSpeakButton(tweetElement, () => speak(tweet));
};

const isSpeakTarget = (tweet: Tweet) => true;
const speak = (tweet: Tweet) => {
  console.log(tweet);
  const utterance = utteranceFromTweet(tweet);
  window.speechSynthesis.speak(utterance);
};

const utteranceFromTweet = (tweet: Tweet) => {
  const convertNode = (node: Node) => {
    switch (node.nodeName) {
      case "A":
        return "URL";
      default:
        return node.textContent;
    }
  };
  const textContent = Array.from(tweet.text).map(convertNode).join("");
  const utterance = new SpeechSynthesisUtterance(
    `${tweet.timeline}\n ${tweet.username}\n ${textContent}`
  );
  utterance.rate = 1.6;
  return utterance;
};

const addSpeakButton = (tweetElement: Element, onClick: () => void) => {
  const actionList = tweetElement.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = document.createElement("a");
  button.href = "#";
  button.rel = "speak";
  button.classList.add("tweet-action");
  button.textContent = "🔈";
  button.onclick = onClick;
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};
