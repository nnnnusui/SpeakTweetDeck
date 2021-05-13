const speak = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const text =
    tweetElement.getElementsByClassName("js-tweet-text")[0].textContent;
  const utterance = new SpeechSynthesisUtterance(text ? text : "");
  utterance.rate = 1.6;
  window.speechSynthesis.speak(utterance);
  console.log(utterance);
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) =>
    Array.from(mutation.addedNodes).reverse().forEach(speak)
  )
);

const run = () => {
  const container = document.getElementById("container");
  if (!container) return;
  Array.from(container?.getElementsByClassName("js-chirp-container")).forEach(
    (it) => observer.observe(it, { childList: true })
  );
  console.log("SpeakTweetDeck: loaded.");
};

setTimeout(run, 8000);
