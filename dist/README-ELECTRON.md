# Assistente Jurídico IA — Electron (Desktop)

## Pré-requisitos
- Node.js 18+
- npm ou pnpm

## Executar em modo desenvolvimento
```bash
npm install
npm start
```

## Gerar executável

### Windows (.exe installer)
```bash
npm run build:win
```

### macOS (.dmg)
```bash
npm run build:mac
```

### Linux (.AppImage e .deb)
```bash
npm run build:linux
```

### Todos os sistemas
```bash
npm run build:all
```

Os instaladores ficam em `dist-electron/`.

## Observações
- O app funciona 100% offline — todas as funções usam localStorage
- Para usar IA (GPT/Claude), configure sua chave de API nas Configurações do app
- Dados ficam salvos no perfil do usuário do sistema operacional
