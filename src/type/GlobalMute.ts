type Listener = (state: boolean) => void;
const listeners = new Array<Listener>();
const addListener = (listener: Listener): void => {
  listeners.push(listener);
};

const key = "mute";
const get = (): boolean => localStorage.getItem(key) === true.toString();
const set = (state: boolean): void => {
  localStorage.setItem(key, state.toString());
  listeners.forEach((it) => it(state));
};
const toggle = (): boolean => {
  const result = !get();
  set(result);
  return result;
};

export const GlobalMute = { get, set, toggle, addListener };
