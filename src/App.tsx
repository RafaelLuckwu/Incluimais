import React, { useEffect, useState } from 'react'
import FractionsGame from './games/FractionsGame'
import OperationsGame from './games/OperationsGame'
import GeometryGame from './games/GeometryGame'
import Mascot from './components/Mascot'
import { loadScore, saveScore, speak } from './utils/storage'

export default function App() {
  const [game, setGame] = useState<'menu' | 'fractions' | 'operations' | 'geometry'>('menu')
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [score, setScore] = useState(0)
  const [narration, setNarration] = useState(true)

  useEffect(() => {
    setScore(loadScore())
  }, [])

  useEffect(() => {
    saveScore(score)
  }, [score])

  return (
    <div className={`app-root ${highContrast ? 'high-contrast' : ''}`} data-reduced-motion={reducedMotion}>
      <header className="topbar">
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <Mascot size={56} />
          <div>
            <h1 className="brand">IncluiMais</h1>
            <p className="tagline">Matemática lúdica para neurodivergentes</p>
          </div>
        </div>
        <div className="accessibility">
          <div className="score">Pontos: <strong>{score}</strong></div>
          <label>
            <input type="checkbox" checked={narration} onChange={e => setNarration(e.target.checked)} /> Narração
          </label>
          <label>
            <input type="checkbox" checked={highContrast} onChange={e => setHighContrast(e.target.checked)} /> Contraste
          </label>
          <label>
            <input type="checkbox" checked={reducedMotion} onChange={e => setReducedMotion(e.target.checked)} /> Reduzir animações
          </label>
        </div>
      </header>

      {game === 'menu' && (
        <main className="menu">
          <p className="intro">Escolha um jogo — cada card tem explicações curtas e um objetivo claro.</p>
          <div className="cards">
            <div className="card card-fractions" role="button" tabIndex={0} onClick={() => setGame('fractions')}>
              <h3>Frações</h3>
              <p>Comparar, somar e entender frações de forma visual.</p>
            </div>
            <div className="card card-operations" role="button" tabIndex={0} onClick={() => setGame('operations')}>
              <h3>Operações</h3>
              <p>Multiplicação e divisão com estratégias lúdicas.</p>
            </div>
            <div className="card card-geometry" role="button" tabIndex={0} onClick={() => setGame('geometry')}>
              <h3>Geometria</h3>
              <p>Perímetro e área com interações visuais.</p>
            </div>
          </div>
        </main>
      )}

  {game === 'fractions' && <FractionsGame narration={narration} onBack={() => setGame('menu')} onScore={(n)=>{ setScore(s=>s+n); if(narration) speak(`Você ganhou ${n} pontos`) }} />}
      {game === 'operations' && <OperationsGame onBack={() => setGame('menu')} onScore={(n)=>{ setScore(s=>s+n); if(narration) speak(`Você ganhou ${n} pontos`) }} />}
      {game === 'geometry' && <GeometryGame onBack={() => setGame('menu')} onScore={(n)=>{ setScore(s=>s+n); if(narration) speak(`Você ganhou ${n} pontos`) }} />}

      {game === 'menu' && (
        <div className="menu-actions">
          <button onClick={()=>{ setScore(0); saveScore(0); }}>Resetar pontos</button>
        </div>
      )}

      <footer>
        <small>Protótipo para testar mecânicas de gamificação e acessibilidade.</small>
      </footer>
    </div>
  )
}
