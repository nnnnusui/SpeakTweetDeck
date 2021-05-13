const fromElement = (source: Element) => {
  const timeline =
    source.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
      ?.getElementsByClassName("column-heading")[0].textContent;
  const username = source.getElementsByClassName("fullname")[0].textContent;
  const text = source.getElementsByClassName("js-tweet-text")[0].textContent;
  return {
    timeline: timeline ? timeline : "",
    username: username ? username : "",
    text: text ? text : "",
  };
};
type Tweet = ReturnType<typeof fromElement>;
const Tweet = {
  fromElement,
};
export { Tweet };
