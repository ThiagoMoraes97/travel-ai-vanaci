<div align="center">

# ✈️ Travel AI
Plataforma inteligente de busca e descoberta de hospedagens com recomendação contextual via IA.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-000000?style=flat)

</div>

## 📌 Visão Geral
O Travel AI oferece uma experiência moderna de exploração de hotéis combinando filtros estruturados e um assistente conversacional integrado. A aplicação aplica automaticamente filtros sugeridos pela IA (via workflow n8n) para acelerar a descoberta de hospedagens relevantes.

## 🚀 Principais Funcionalidades
- 🤖 Chat com IA para busca contextual
- 🧭 Sugestões dinâmicas de filtros (preço máximo, destino, comodidades)
- 📅 Seleção de datas com calendário popover customizado
- 💰 Slider de preço (valor máximo)
- � Grid responsivo de resultados
- 🌙 Tema com suporte a variações de cor (pronto para dark mode)
- 🔔 Notificações via toasts
- ⚡ Build rápido e DX otimizada com Vite

## 🛠️ Stack Tecnológica
| Camada | Tecnologia |
|--------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| UI Base | shadcn/ui + Radix Primitives |
| Estilos | Tailwind CSS |
| Ícones | Lucide React |
| Datas | date-fns |
| HTTP | Axios |
| IA Orquestração | n8n (Webhook) |

## 🧩 Arquitetura & Estrutura de Pastas
```
src/
├── assets/            # Imagens e arquivos estáticos
├── components/        # Componentes de interface
│   ├── ui/            # Componentes base (shadcn/ui adaptados)
│   ├── AppHeader.tsx  # Cabeçalho com branding
│   ├── ChatDrawer.tsx # Chat com IA e integração webhook
│   ├── SearchFilters.tsx # Formulário de filtros
│   ├── HotelGrid.tsx  # Exibição de hotéis
│   └── FloatingChatButton.tsx
├── hooks/             # Custom hooks
├── lib/               # Utilidades (ex: funções helpers)
├── pages/             # Páginas principais
└── index.css          # Estilos globais / tokens
```

## 🔌 Integração com n8n (Webhook)
O chat envia requisições POST para um webhook configurado no n8n. O workflow deve:
1. Receber `{ message, filters? }`
2. Processar NLP / regras
3. Responder no formato abaixo:

```json
{
  "message": "Aqui estão opções de hotéis no Rio de Janeiro até R$ 400",
  "filters": {
    "maxPrice": [400],
    "destination": "Rio de Janeiro",
    "amenities": ["Piscina", "Wi-Fi"]
  }
}
```

Campos suportados em `filters` atualmente:
- `maxPrice`: número dentro de array (ex.: `[500]`)
- `destination`: string
- `amenities`: array de strings
- (extensível futuramente: `stars`, `checkIn`, `checkOut` etc.)

### Exemplo de Node Function (n8n) para resposta
```js
return [{ json: {
  message: `Buscando hotéis em ${$json.destination || 'destino informado'}...`,
  filters: {
    maxPrice: [400],
    destination: 'Rio de Janeiro',
    amenities: ['Piscina', 'Wi-Fi']
  }
}}];
```

## ⚙️ Configuração & Execução
### Pré-requisitos
- Node.js 18+
- npm (ou pnpm / yarn / bun se adaptar os scripts)

### Clonar e Rodar
```bash
git clone https://github.com/ThiagoMoraes97/travel-ai-vanaci.git
cd travel-ai-vanaci
npm install
cp .env.example .env  # se o arquivo existir / criar manualmente
npm run dev
```
Aplicação: http://localhost:5173

### Scripts Disponíveis
```bash
npm run dev       # Desenvolvimento
npm run build     # Build produção
npm run preview   # Servir build local
```

## � Variáveis de Ambiente
Crie um arquivo `.env` na raiz:
```env
VITE_N8N_WEBHOOK_URL=https://SEU-ENDERECO-N8N/webhook/chat-ai
```
Boas práticas:
- Nunca commitar `.env` (já ignorado no `.gitignore`)
- Fornecer `.env.example` para onboard rápido

## 🧪 Testes (Sugestão)
Ainda não implementado. Recomenda-se:
- Vitest + Testing Library para componentes
- Mock de webhook com MSW

## 🗺️ Roadmap (Ideias Futuras)
- [ ] Paginação real com backend
- [ ] Persistência de histórico de conversa
- [ ] Suporte a múltiplos idiomas
- [ ] Autenticação e perfis de usuário
- [ ] Integração com provedores reais de hospedagem (ex: Amadeus API)
- [ ] Ranking inteligente baseado em preferências
- [ ] Modo offline básico / cache

## 🤝 Contribuição
1. Fork
2. Branch feature: `git checkout -b feature/minha-feature`
3. Commits semânticos: `feat:`, `fix:`, `docs:`, `chore:` ...
4. Pull Request com descrição clara

## 📝 Licença
Distribuído sob a Licença MIT. Veja `LICENSE` (adicionar caso ainda não exista).

## � Autor
**Thiago Moraes**  
GitHub: [@ThiagoMoraes97](https://github.com/ThiagoMoraes97)  
LinkedIn: [Thiago Moraes](https://linkedin.com/in/thiago-moraes)

---
Se este projeto for útil, deixe uma ⭐ e compartilhe feedback!