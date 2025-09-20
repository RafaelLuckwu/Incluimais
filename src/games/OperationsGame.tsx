import React, { useState } from 'react'
import { speak } from '../utils/storage'

export default function OperationsGame({ onBack, onScore }: { onBack: () => void; onScore?: (n: number) => void }) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  // Simple default question: 12 x 4
  const correct = '48'

  function submit() {
    if (answer.trim() === correct) {
      setMessage('Correto! 12 × 4 = 48')
      speak('Muito bem! Você ganhou 8 pontos')
      onScore && onScore(8)
    } else {
      setMessage('Tente novamente. Dica: 12×4 = (10+2)×4')
      speak('Tente novamente')
    }
  }

  return (
    <main>
      <h2>Operações — Desafio rápido</h2>
      <p>Resolva: 12 × 4</p>
      <label>
        Sua resposta:
        <input value={answer} onChange={e => setAnswer(e.target.value)} aria-label="Resposta de operação" />
      </label>
      <div className="buttons">
        <button onClick={submit}>Enviar</button>
        <button onClick={onBack}>Voltar</button>
      </div>
      {message && <p className="message">{message}</p>}
    </main>
  )
}
