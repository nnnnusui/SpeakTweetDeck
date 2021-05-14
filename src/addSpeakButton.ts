export const addSpeakButton = (
  tweetElement: Element,
  onClick: () => void
): void => {
  const actionList = tweetElement.getElementsByClassName("tweet-actions")[0];
  if (!actionList) return;
  const button = document.createElement("a");
  button.href = "#";
  button.title = "play speak";
  button.classList.add("tweet-action");
  button.textContent = "🔊";
  button.onclick = onClick;
  const container = document.createElement("li");
  container.appendChild(button);
  actionList.appendChild(container);
};
