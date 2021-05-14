import { Tweet } from "./Tweet";

type Condition = Partial<Tweet>;
export type WhiteList = Condition[];

const equals = (it: Condition, that: Condition) =>
  it.timeline?.title === that.timeline?.title &&
  it.timeline?.account === that.timeline?.account &&
  it.isRetweet === that.isRetweet &&
  it.isReply === that.isReply &&
  it.userId === that.userId &&
  it.userName === that.userName;
// && it.media?.type === that.media?.type
// && it.media?.amount === that.media?.amount

const check = (it: Condition, tweet: Tweet) =>
  (!it.timeline?.title || it.timeline.title === tweet.timeline.title) &&
  (!it.timeline?.account || it.timeline.account === tweet.timeline.account) &&
  (!it.isRetweet || it.isRetweet === tweet.isRetweet) &&
  (!it.isReply || it.isReply === tweet.isReply) &&
  (!it.userId || it.userId === tweet.userId) &&
  (!it.userName || it.userName === tweet.userName) &&
  (!it.media?.type || it.media.type === tweet.media.type) &&
  (!it.media?.amount || it.media.amount === tweet.media.amount);

const key = "whitelist";
const get = (): WhiteList => {
  const whitelistStr = localStorage.getItem(key);
  return JSON.parse(whitelistStr ? whitelistStr : "[]") as WhiteList;
};
export const WhiteList = {
  get,
  add: (it: Condition): void => {
    const whitelist = [...get(), it];
    localStorage.setItem(key, JSON.stringify(whitelist));
  },
  remove: (that: Condition): void => {
    const whitelist = get().filter((it) => !equals(it, that));
    localStorage.setItem(key, JSON.stringify(whitelist));
  },
  exists: (that: Condition): boolean => !!get().find((it) => equals(it, that)),
  check: (that: Tweet): boolean => !!get().find((it) => check(it, that)),
};
