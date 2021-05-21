const key = "utteranceParameter";
type UtteranceParameter = {
  rate: SpeechSynthesisUtterance["rate"];
};
const get = (): UtteranceParameter => {
  const value = localStorage.getItem(key);
  if (!value) return { rate: 1 };
  return JSON.parse(value);
};
const set = (state: UtteranceParameter): void => {
  localStorage.setItem(key, JSON.stringify(state));
};
const update = (part: Partial<UtteranceParameter>): void => {
  set({ ...get(), ...part });
};
const applyTo = (
  utterance: SpeechSynthesisUtterance
): SpeechSynthesisUtterance => {
  const current = get();
  utterance.rate = current.rate;
  return utterance;
};

export const UtteranceParameter = { get, set, update, applyTo };
