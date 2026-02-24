# Vue Practice - Modern Nuxt 3 Project

A modern, production-ready Nuxt 3 project demonstrating industry best practices including TypeScript, Pinia state management, API service layers, and comprehensive development tooling.

## 🎯 Project Features

- **Nuxt 3** - Latest Vue 3 framework with file-based routing
- **TypeScript** - Full type safety with strict mode
- **Pinia** - Modern state management with composition API
- **Structured Architecture** - Services, utilities, types, constants, composables
- **Code Quality** - ESLint, Prettier, type checking
- **Best Practices** - Following modern web development standards

## 📁 Project Structure

```
app/
├── layouts/          # Route layouts
├── pages/            # File-based routes
├── composables/      # Reusable composition functions
├── stores/           # Pinia state management
├── services/         # API and business logic
├── types/            # TypeScript type definitions
├── constants/        # Application constants
├── utils/            # Helper functions
├── middleware/       # Route middleware
├── styles/           # Global stylesheets
└── app.vue           # Root component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Create .env file from template
cp .env.example .env
```

### Development

```bash
# Start dev server
pnpm dev

# Opens http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start development server     |
| `pnpm build`      | Build for production         |
| `pnpm generate`   | Generate static site         |
| `pnpm preview`    | Preview production build     |
| `pnpm lint`       | Run ESLint                   |
| `pnpm lint:fix`   | Fix ESLint issues            |
| `pnpm format`     | Format code with Prettier    |
| `pnpm type-check` | Run TypeScript type checking |

## 🏗 Architecture Patterns

### Types & Interfaces

Centralized type definitions in `app/types/` for type safety across the application.

```ts
// app/types/index.ts
export interface Counter {
  count: number
  lastUpdated: string | null
}
```

### Constants

Application-wide constants in `app/constants/`:

```ts
// app/constants/index.ts
export const API = {
  BASE_URL: 'http://localhost:3000/api',
  TIMEOUT: 10000,
}
```

### Services

API service layer with centralized HTTP client:

```ts
// app/services/api.ts
export const apiClient = new ApiClient(API.BASE_URL)
const response = await apiClient.getCounter()
```

### State Management (Pinia)

Modern composition API style stores:

```ts
// app/stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  // state, getters, actions
})
```

### Utilities

Reusable helper functions:

```ts
// app/utils/format.ts
export const formatDate = (date: string | null): string => { ... }
```

### Middleware

Route protection and analytics:

```ts
// app/middleware/auth.ts
export default defineRouteMiddleware((to, from) => { ... })
```

## 🔧 Configuration

### Environment Variables

Create `.env` file from `.env.example`:

```env
NUXT_PUBLIC_APP_NAME=Vue Practice
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Steam Web API (Optional - Required for Steam News feature)
# Get your key from: https://steamcommunity.com/dev/apikey
NUXT_STEAM_API_KEY=your_steam_api_key_here
```

#### Steam API Key Setup

The Steam News feature requires a Steam Web API Key. To set it up:

1. Visit [Steam Web API Key page](https://steamcommunity.com/dev/apikey)
2. Log in with your Steam account
3. Register your domain (for development, use `localhost`)
4. Copy the generated API Key
5. Add it to your `.env` file as `NUXT_STEAM_API_KEY`
6. Restart your development server

**Note:** Steam News functionality will be disabled if the API Key is not configured.

#### Steam API Usage

The Steam News API supports flexible configuration:

**Server API Endpoints:**
- `GET /api/steam/community?count=20&appids=730,570,1172470`
  - `count`: Number of news items (default: 20)
  - `appids`: Comma-separated game AppIDs (optional, uses popular games by default)

- `GET /api/steam/sales?count=15&appids=593110,730&tag=特賣活動`
  - `count`: Number of news items (default: 15)
  - `appids`: Comma-separated game AppIDs (optional)
  - `tag`: Custom tag for news items (optional, default: "特賣活動")

**Client API:**
```typescript
import { getSteamCommunityNews, getSteamSalesNews } from '~/pages/projects/news/api/steamApi'

// Using default popular games
const news = await getSteamCommunityNews(20)

// Using custom game AppIDs
const customNews = await getSteamCommunityNews(20, [730, 570, 1172470])

// Sales news with custom configuration
const salesNews = await getSteamSalesNews(15, [593110, 730], 'Weekend Sale')
```

### TypeScript

Strict TypeScript configuration in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Code Formatting

- **ESLint** - Enforces code quality rules
- **Prettier** - Auto-formats code for consistency

Install VS Code extensions for best experience:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 📚 Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Guide](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

MIT

# yarn

yarn build

# bun

bun run build

````

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
````

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
