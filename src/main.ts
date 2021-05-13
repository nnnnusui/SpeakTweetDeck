const uttrance = (text: string) => {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.rate = 1.6;
  return uttr;
};

setTimeout(() => {
  window.speechSynthesis.speak(uttrance("テスト"));
}, 5000);
