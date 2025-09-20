import React, { useState } from 'react'
import { speak } from '../utils/storage'

export default function GeometryGame({ onBack, onScore }: { onBack: () => void; onScore?: (n: number) => void }) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  // Simple default question: area of rectangle 5 x 3
  const correct = '15'

  function submit() {
    if (answer.trim() === correct) {
      setMessage('Correto! Área = 5 × 3 = 15')
      speak('Correto! Você ganhou 12 pontos')
      onScore && onScore(12)
    } else {
      setMessage('Tente novamente. Dica: área do retângulo = base × altura')
      speak('Tente novamente')
    }
  }

  return (
    <main>
      <h2>Geometria — Desafio rápido</h2>
      <p>Calcule a área: retângulo com base 5 e altura 3</p>
      <div className="geometry-visual" aria-hidden>
        <svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="140" height="80" fill="#c7ceea" stroke="#7a7ecb" />
          <text x="80" y="55" textAnchor="middle" fontWeight="700" fill="#333">5 × 3</text>
        </svg>
      </div>
      <label>
        Sua resposta (número):
        <input value={answer} onChange={e => setAnswer(e.target.value)} aria-label="Resposta de geometria" />
      </label>
      <div className="buttons">
        <button onClick={submit}>Enviar</button>
        <button onClick={onBack}>Voltar</button>
      </div>
      {message && <p className="message">{message}</p>}
    </main>
  )
}
