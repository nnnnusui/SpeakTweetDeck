const fromElement = (source: Element) => {
  const account = source
    ?.getElementsByClassName("column-header-title")[0]
    ?.getElementsByClassName("attribution")[0]?.textContent;
  const title = source?.getElementsByClassName("column-heading")[0].textContent;
  return { title: title ? title : "", account: account ? account : "" };
};
type Timeline = ReturnType<typeof fromElement>;
const Timeline = {
  fromElement,
};
export { Timeline };
