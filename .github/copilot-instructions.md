# IncluiMais — Instruções para agentes de programação

Objetivo rápido
- Este repositório é um protótipo frontend (Vite + React + TypeScript) para uma plataforma gamificada chamada "IncluiMais".
- Foco principal: três mini-jogos em `src/games/*` (Fractions, Operations, Geometry), recursos de acessibilidade e TTS via `src/utils/storage.ts`.

Estrutura e pontos críticos
- `index.html`, `vite.config.ts`, `package.json` — configuração do app.
- `src/App.tsx` — ponto de entrada da UI, gerencia navegação entre jogos, estado global de preferências (narration, highContrast, reducedMotion) e pontuação (gravada via `saveScore` em `src/utils/storage.ts`).
- `src/games/*.tsx` — componentes de cada jogo. Modificações aqui devem preservar chamadas a `onScore(n)` para atualizar a pontuação no App.
- `src/utils/storage.ts` — funções utilitárias: `saveScore`, `loadScore`, `speak` (usando SpeechSynthesis). Preserve a chave localStorage `incluimais_score_v1`.
- `src/components/Mascot.tsx` — componente visual reutilizado no cabeçalho.

Dependências notáveis
- Drag & Drop e animações: `@dnd-kit/core`, `@dnd-kit/sortable`, `framer-motion` — usado no `FractionsGame` para interações visuais. Instalações no Windows podem precisar de `npm install --no-optional` ou da instalação pontual do binário opcional do rollup (causa: rollup native optional binaries). Se o dev server falhar com erro sobre `@rollup/rollup-win32-x64-msvc`, instalar essa dependência opcional pode resolver localmente.

Desenvolvimento & fluxo de verificação
- Instalar: `npm install` (no Windows preferir `npm install --no-optional` se houver problemas nativos).
- Rodar em dev: `npm run dev` (Vite; normalmente em http://localhost:5173/).
- Build: `npm run build`; Preview: `npm run preview`.
- Observação: ao editar `src/games/FractionsGame.tsx`, há dependência direta em `@dnd-kit` + `framer-motion` — alterações aqui exigem checagem do dev server.

Padrões e convenções do projeto
- Estado e persistência
  - Pontuação é mantida como número simples em localStorage usando a chave `incluimais_score_v1` via `saveScore`/`loadScore`.
  - Todas as atualizações de pontuação são feitas chamando `onScore(n)` no componente do jogo; `App.tsx` agrega e persiste.

- Acessibilidade e preferências
  - `App.tsx` contém os toggles: `narration`, `highContrast`, `reducedMotion`. Passe `narration` como prop para jogos para habilitar `speak()`.
  - Evite suprimir aria-live ou `speak()` quando `narration` estiver ativo — este protótipo usa multimodalidade (visual + TTS).

- Interações e DnD
  - O archetype visual no `FractionsGame` converte 1/2 em 2×1/4 e deixa o usuário arrastar blocos para uma "Área de resultado"; a lógica atual inspeciona ids (por exemplo `q-0`, `half-0`) para determinar origem ao mover/remover.
  - Ao adicionar novos arrastáveis, mantenha ids legíveis e estáveis para que a lógica de restauração e contagem funcione.

Testes rápidos e debugging
- Se o dev server falhar com erro do Rollup native binary no Windows: remover `node_modules` e `package-lock.json` e reinstalar com `npm i --omit=optional` ou instalar `@rollup/rollup-win32-x64-msvc` como opcional localmente.
- Console do navegador: verificar mensagens de `speak()` e event handlers quando testar interações DnD.

Arquivo-chave para referência rápida
- `src/App.tsx` — navegação, toggles e ponto de integração com `speak()` e score.
- `src/games/FractionsGame.tsx` — implementação dnd-kit + framer-motion (padrão para interações visuais complexas).
- `src/utils/storage.ts` — TTS e persistência (leia para entender o contrato de `onScore`).

Como escrever mudanças ou PRs úteis
- Priorize: (1) preservar chamadas a `onScore`, (2) respeitar `narration` e `reducedMotion`, (3) manter ids previsíveis para itens arrastáveis.
- Inclua em PRs: comando para rodar localmente (por exemplo, `npm i && npm run dev`), nota sobre alterações de dependência (ex: adicionou `@dnd-kit`), e uma breve descrição de acessibilidade testada.

Exemplo de mudança segura (snippet)
 - Se você adicionar um novo arrastável em `FractionsGame`, use id `q-N` ou `half-N` e atualize os contadores de origem:

  // ...existing code...
  setSourceQuarters(q => q + 1)

Checklist de revisão rápida antes de commitar
- Código compila (`npm run dev` inicia sem erros).
- Não adicione `node_modules` nem `package-lock.json` ao commit.
- Mantenha a key `incluimais_score_v1` se alterar persistência.
- Documente dependências nativas ou passos Windows específicos no `README.md`.

Seções que eu não adicionei (peça se quiser)
- Integração CI (GitHub Actions) — não existe aqui; posso sugerir um pipeline minimal.
- Testes automatizados — atualmente não há testes; posso adicionar um teste de smoke se desejar.

Se algo estiver faltando ou impreciso, diga quais arquivos/devices você quer que eu inspecione mais a fundo e eu ajusto este guia.
