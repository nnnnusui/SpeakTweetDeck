// type Home = {
//   kind: "home", account : string
// }
// const home = (source: Element): Home => {
//   const account = source
//     ?.getElementsByClassName("column-header-title")[0]
//     ?.getElementsByClassName("attribution")[0]?.textContent;
//   if (!account) throw Error("onTimeline: account info not found.");
//   return {
//     kind: "home",
//     account: account
//   }
// }
// const getParameter = (source: Element, type: string) => {
//   switch(type) {
//     case "home":
//       return home(source);
//     case "search": {
//       return {
//         kind: type,
//         value:
//       }
//     }
//   }
// }
// const iconTypePrefix = "icon-";
const fromElement = (source: Element): Timeline => {
  // const icon = source.getElementsByClassName("column-type-icon")[0];
  // const iconType = Array.from(icon.classList)
  //   .find((it) => it.startsWith(iconTypePrefix))
  //   ?.substr(iconTypePrefix.length);
  // const type = iconType ? iconType : "other";
  // console.log(type);
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
