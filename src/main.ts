const parseTimelineElement = (source: Element) => {
  // const tweetContainers = source
  //   .getElementsByClassName("chirp-container")[0]
  //   .getElementsByTagName("article")
  const name = source.getElementsByClassName("column-heading")[0]?.textContent;
  const tweets = source.getElementsByClassName("tweet");
  return { name, tweets };
};

const utterance = (text: string) => {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.rate = 1.6;
  return uttr;
};

const speak = (tweetNode: Node) => {
  const tweetElement = tweetNode as Element;
  const text =
    tweetElement.getElementsByClassName("js-tweet-text")[0].textContent;
  window.speechSynthesis.speak(utterance(text ? text : ""));
};

setTimeout(() => {
  // const timelineElements = document
  //   ?.getElementById("container")
  //   ?.getElementsByClassName("horizontal-flow-container")[0]
  //   ?.getElementsByTagName("section");
  // if (!timelineElements) return;
  // const timelines = Array.from(timelineElements).map(parseTimelineElement);
  // console.log(timelines);
  // window.speechSynthesis.speak(utterance(timelines.length.toString()));
  const container = document.getElementById("container");
  if (!container) return;
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) => mutation.addedNodes.forEach(speak))
  );
  Array.from(container.getElementsByClassName("js-chirp-container")).forEach(
    (it) => observer.observe(it, { childList: true })
  );
}, 5000);
