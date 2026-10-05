# Pokédex React

Aplicação web interativa feita em **React + Vite** para a disciplina de Frameworks Web I (Unilavras). Lista os Pokémon com paginação, busca em tempo real, filtro por tipo e página de detalhes com estatísticas.

**API utilizada:** [PokéAPI](https://pokeapi.co/) (pública, sem chave).

**Tecnologias:** React, react-router-dom, axios, Material-UI (MUI), Hooks (useState, useEffect, useMemo).

## Funcionalidades

- Listagem paginada (12 por página) com cards reutilizáveis
- Busca por nome em tempo real combinada com filtro por tipo
- Rota dinâmica `/item/:id` com detalhes do Pokémon
- Indicador de carregamento e mensagens de erro amigáveis
- Layout responsivo com Material-UI

## Como executar

```bash
git clone https://github.com/SEU-USUARIO/trabalho-final-Frameworks_Web_I.git
cd trabalho-final-Frameworks_Web_I
npm install
npm run dev
```

Acesse http://localhost:5173 no navegador. Requer Node.js 18 ou superior.

## Estrutura

```
src/
  components/  Header, PokemonCard, SearchFilters, Feedback
  pages/       Home, Details
  services/    api.js (axios)
  App.jsx      rotas
  main.jsx     entrada, tema e BrowserRouter
```
