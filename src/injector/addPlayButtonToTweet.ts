import { playButton } from "../element/playButton";

export const addPlayButtonToTweet = (tweet: Element): void => {
  const actionList = tweet.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = playButton(tweet);
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};
