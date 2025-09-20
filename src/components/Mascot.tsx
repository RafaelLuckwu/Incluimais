import React from 'react'

export default function Mascot({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#ffd166" />
      <circle cx="22" cy="24" r="4" fill="#fff" />
      <circle cx="42" cy="24" r="4" fill="#fff" />
      <path d="M22 44c4 4 16 4 20 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
