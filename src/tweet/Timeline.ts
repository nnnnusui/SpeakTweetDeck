const fromElement = (source: Element): Timeline => {
  const account = source
    ?.getElementsByClassName("column-header-title")[0]
    ?.getElementsByClassName("attribution")[0]?.textContent;
  const title =
    source?.getElementsByClassName("column-heading")[0]?.textContent;
  return { title: title ? title : "", account: account ? account : "" };
};
type Timeline = {
  title: string;
  account: string;
};
const Timeline = {
  fromElement,
};
export { Timeline };
