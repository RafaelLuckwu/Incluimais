# Incluimais

Protótipo de plataforma gamificada para ensino de matemática a pessoas neurodivergentes.

Como rodar (Windows PowerShell):

1. Instale dependências:

```powershell
npm install
```

2. Rode em modo desenvolvimento:

```powershell
npm run dev
```

O servidor abre tipicamente em http://localhost:5173

O protótipo contém três mini-jogos: Frações, Operações e Geometria, com controles de acessibilidade (alto contraste e reduzir movimento).

Arquivos principais:

- `src/App.tsx` — navegação e acessibilidade
- `src/games/*` — três mini-jogos
- `index.html`, `vite.config.ts`, `package.json`

Nota: este protótipo agora usa `@dnd-kit/core` e `framer-motion` para interações drag-and-drop e animações. Instale dependências com:

```powershell
npm install --no-optional
```

Próximos passos sugeridos: adicionar pontuação, perfis de usuário, feedback multimodal (áudio/visual), e testes com usuários neurodivergentes.
