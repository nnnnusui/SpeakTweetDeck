const key = "utteranceParameter";
export type UtteranceParameter = {
  voice: string | null;
  rate: SpeechSynthesisUtterance["rate"];
  pitch: SpeechSynthesisUtterance["pitch"];
};
const get = (): UtteranceParameter => {
  const value = localStorage.getItem(key);
  if (!value) return { voice: null, rate: 1, pitch: 1 };
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
  const voice = window.speechSynthesis
    .getVoices()
    .find((it) => it.voiceURI === current.voice);
  utterance.voice = voice ? voice : null;
  utterance.rate = current.rate;
  utterance.pitch = current.pitch;
  return utterance;
};

export const UtteranceParameter = { get, set, update, applyTo };
