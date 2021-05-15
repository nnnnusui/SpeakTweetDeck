import { FilteringCondition } from "./FilteringCondition";
import { Tweet } from "./Tweet";
import { Timeline } from "./tweet/Timeline";

type Condition = FilteringCondition;
export type WhiteList = Condition[];

const equals = (it: Condition, that: Condition) =>
  (it.timeline === that.timeline ||
    (it.timeline &&
      that.timeline &&
      Timeline.equals(it.timeline, that.timeline))) &&
  it.isRetweet === that.isRetweet &&
  it.isReply === that.isReply &&
  it.userId === that.userId &&
  it.userName === that.userName;
// && it.media?.type === that.media?.type
// && it.media?.amount === that.media?.amount

const check = (it: Condition, tweet: Tweet) =>
  (!it.timeline || Timeline.equals(it.timeline, tweet.timeline)) &&
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
