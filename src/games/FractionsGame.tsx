import React, { useEffect, useState } from 'react'
import { speak } from '../utils/storage'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragEndEvent
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'

type Props = { onBack: () => void; onScore?: (n: number) => void; narration?: boolean }

// Small interactive fractions activity: convert 1/2 -> 2×1/4 and drag quarters to result area
export default function FractionsGame({ onBack, onScore, narration }: Props) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  // visual pieces
  const [halvesConverted, setHalvesConverted] = useState(0) // number of quarter blocks produced from the half
  const [sourceQuarters, setSourceQuarters] = useState(1) // the standalone 1/4
  const [resultBlocks, setResultBlocks] = useState<string[]>([])

  useEffect(()=>{ if (narration) speak('Vamos praticar somando frações: 1 meio + 1 quarto. Converta e arraste os blocos.') }, [narration])

  function convertHalf() {
    if (halvesConverted === 0) {
      setHalvesConverted(2)
      if (narration) speak('Converti 1 meio em dois quartos. Pegue os blocos e coloque na área de resultado.')
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    // if dropped into result-area (we name it 'result') accept the id
    if (over.id === 'result-area') {
      const payload = active.id as string
      // remove from sources
      if (payload.startsWith('half-')) setHalvesConverted(h => Math.max(0, h - 1))
      if (payload.startsWith('q-')) setSourceQuarters(q => Math.max(0, q - 1))
      setResultBlocks(r => [...r, payload])
    }
  }

  function pickAndPlace(id: string, from: 'half'|'quarter'){
    if (from === 'half') setHalvesConverted(h => Math.max(0, h - 1))
    if (from === 'quarter') setSourceQuarters(q => Math.max(0, q - 1))
    setResultBlocks(r => [...r, id])
    if (narration) speak('Item movido para a área de resultado')
  }

  useEffect(()=>{
    if (resultBlocks.length >= 3) {
      setMessage('Parabéns! Você formou 3/4')
      if (narration) speak('Parabéns! Você formou três quartos e ganhou 15 pontos')
      onScore && onScore(15)
    }
  }, [resultBlocks, narration, onScore])

  function submit(){
    if (answer.trim() === '3/4'){
      setMessage('Correto!')
      if (narration) speak('Correto! Você ganhou 10 pontos')
      onScore && onScore(10)
    } else {
      setMessage('Tente novamente.')
      if (narration) speak('Tente novamente')
    }
  }

  return (
    <main>
      <h2>Frações — Interativo</h2>
      <p>Resolva 1/2 + 1/4 visualmente: converta e arraste os blocos para formar 3/4.</p>

      <div className="fraction-visual">
        <div className="sources">
          <div className="half source">
            <div className="label">1/2</div>
            <div className="controls"><button onClick={convertHalf} disabled={halvesConverted>0}>Converter para quartos</button></div>
            <div className="blocks">
              {Array.from({length:halvesConverted}).map((_,i)=> (
                <motion.div key={`half-${i}`} id={`half-${i}`} className="block quarter draggable" tabIndex={0} role="button" onKeyDown={(e)=>{ if (e.key==='Enter') pickAndPlace(`half-${i}`,'half') }}>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="quarter source">
            <div className="label">1/4</div>
            <div className="blocks">
              {Array.from({length:sourceQuarters}).map((_,i)=>(
                <motion.div key={`q-${i}`} id={`q-${i}`} className="block quarter draggable" tabIndex={0} role="button" onKeyDown={(e)=>{ if (e.key==='Enter') pickAndPlace(`q-${i}`,'quarter') }}>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div id="result-area" className="result-area droppable" aria-live="polite">
            <div className="label">Área de resultado</div>
            <div className="result-blocks">
              {resultBlocks.map((id,i)=>(<motion.div key={id+i} className="block quarter in-result" />))}
            </div>
          </div>
        </DndContext>
      </div>

      <label>
        Sua resposta (ex: 3/4):
        <input value={answer} onChange={e=>setAnswer(e.target.value)} aria-label="Resposta de fração" />
      </label>
      <div className="buttons">
        <button onClick={submit}>Enviar</button>
        <button onClick={onBack}>Voltar</button>
      </div>

      {message && <p className="message">{message}</p>}
    </main>
  )
}
