export const SCORE_KEY = 'incluimais_score_v1'

export function saveScore(score: number) {
  try {
    localStorage.setItem(SCORE_KEY, String(score))
  } catch (e) {
    // ignore
  }
}

export function loadScore() {
  try {
    const v = localStorage.getItem(SCORE_KEY)
    return v ? Number(v) : 0
  } catch (e) {
    return 0
  }
}

export function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  const ut = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(ut)
}
