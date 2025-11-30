# Guía de Desarrollo y Arquitectura Técnica - Gestok

## 🏛️ Arquitectura General

Gestok sigue una arquitectura basada en componentes con gestión de estado centralizada, implementando principios SOLID y clean code.

### Capas de la Aplicación

```
┌────────────────────────────────────────────────────┐
│                CAPA DE PRESENTACIÓN                │
│  - Componentes React (Páginas y UI)               │
│  - Lógica de renderizado                          │
│  - Manejo de eventos de usuario                   │
└──────────────────┬─────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────┐
│              CAPA DE LÓGICA DE NEGOCIO             │
│  - Zustand Stores (State Management)              │
│  - Funciones de validación                        │
│  - Cálculos y transformaciones                    │
└──────────────────┬─────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────┐
│            CAPA DE ACCESO A DATOS                  │
│  - localStorage (persistencia)                     │
│  - API externa (tipo de cambio)                   │
│  - Funciones de serialización                     │
└────────────────────────────────────────────────────┘
```

## 📐 Principios de Diseño

### 1. **Single Responsibility Principle (SRP)**
Cada componente, store y función tiene una única responsabilidad:
- `Button.tsx` - Solo renderiza botones
- `resourceStore.ts` - Solo gestiona recursos
- `helpers.ts` - Solo funciones utilitarias

### 2. **Don't Repeat Yourself (DRY)**
- Componentes UI reutilizables (`Button`, `Input`, `Card`)
- Funciones helper compartidas (`fmtCLP`, `genId`)
- Tipos TypeScript centralizados en `/types`

### 3. **Separation of Concerns**
- Presentación separada de lógica (componentes vs stores)
- Estilos en archivos CSS dedicados
- Tipos en archivos `.ts` separados

### 4. **Composition over Inheritance**
React promueve composición de componentes en lugar de herencia de clases.

## 🔄 Flujo de Datos

### Unidirectional Data Flow

```
┌─────────┐
│  User   │
│ Action  │
└────┬────┘
     │
     ▼
┌─────────────┐
│  Component  │ ◄─── Subscribe
│   (View)    │
└──────┬──────┘
       │ Dispatch
       ▼
┌──────────────┐
│    Store     │
│  (Zustand)   │
└──────┬───────┘
       │ Mutate
       ▼
┌──────────────┐
│    State     │
└──────┬───────┘
       │ Notify
       ▼
┌──────────────┐
│  Component   │
│  Re-render   │
└──────────────┘
```

### Ejemplo Práctico

```typescript
// 1. Usuario hace clic en "Agregar Recurso"
const handleSubmit = () => {
  // 2. Componente dispara acción del store
  addResource({
    id: genId(),
    name: 'Harina',
    unit: 'kg',
    priceCLP: 1200,
    stock: 10,
    priceUSD: 0
  })
}

// 3. Store actualiza estado y persiste
addResource: (resource) => {
  const resources = [...get().resources, resource]
  save(LS_RES, resources)  // Persiste en localStorage
  set({ resources })       // Actualiza estado
}

// 4. Componentes suscritos se re-renderizan automáticamente
const { resources } = useResourceStore()
```

## 🗂️ Organización de Código

### Estructura de Directorios

```
src/
├── components/
│   ├── ui/              # Componentes atómicos reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Chart.tsx
│   │   └── index.ts     # Barrel export
│   └── Layout.tsx       # Layout de aplicación
│
├── pages/               # Páginas/vistas de rutas
│   ├── Dashboard.tsx
│   ├── Resources.tsx
│   ├── Register.tsx
│   ├── Reports.tsx
│   ├── Costs.tsx
│   ├── Recipes.tsx
│   └── Help.tsx
│
├── stores/              # Zustand stores (state management)
│   ├── resourceStore.ts
│   ├── usageStore.ts
│   └── recipeStore.ts
│
├── types/               # TypeScript interfaces y types
│   └── index.ts
│
├── utils/               # Funciones helper y utilidades
│   └── helpers.ts
│
├── App.tsx              # Componente raíz con routing
├── main.tsx             # Entry point
└── index.css            # Estilos globales + Tailwind
```

### Convenciones de Nombres

#### Archivos
- Componentes: `PascalCase` (ej: `Button.tsx`, `Dashboard.tsx`)
- Stores: `camelCase` + `Store` (ej: `resourceStore.ts`)
- Utilidades: `camelCase` (ej: `helpers.ts`)
- Tipos: `index.ts` en directorio `/types`

#### Variables y Funciones
```typescript
// Componentes: PascalCase
const Dashboard: React.FC = () => {}

// Hooks: camelCase con prefijo 'use'
const useResourceStore = create(...)

// Funciones: camelCase
function calculateMonthlyProjection() {}

// Constantes: UPPER_SNAKE_CASE
const LS_RES = 'gestok_resources_v1'

// Interfaces: PascalCase
interface Resource { }

// Props: PascalCase + 'Props'
interface ButtonProps { }
```

## 🎯 State Management con Zustand

### Estructura de un Store

```typescript
import { create } from 'zustand'

interface StoreState {
  // Estado
  data: Type[]
  loading: boolean
  error: string | null
  
  // Acciones
  addItem: (item: Type) => void
  updateItem: (id: string, updates: Partial<Type>) => void
  deleteItem: (id: string) => void
}

const useStore = create<StoreState>((set, get) => ({
  // Estado inicial
  data: load<Type>(STORAGE_KEY),
  loading: false,
  error: null,
  
  // Acciones
  addItem: (item) => {
    const data = [...get().data, item]
    save(STORAGE_KEY, data)
    set({ data })
  },
  
  updateItem: (id, updates) => {
    const data = get().data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
    save(STORAGE_KEY, data)
    set({ data })
  },
  
  deleteItem: (id) => {
    const data = get().data.filter(item => item.id !== id)
    save(STORAGE_KEY, data)
    set({ data })
  }
}))

export default useStore
```

### Uso en Componentes

```typescript
// Seleccionar solo lo necesario (evita re-renders innecesarios)
const resources = useResourceStore(state => state.resources)
const addResource = useResourceStore(state => state.addResource)

// O desestructurar todo
const { resources, addResource, loading } = useResourceStore()
```

## 🎨 Sistema de Diseño

### Paleta de Colores

```typescript
// tailwind.config.js
colors: {
  primary: {
    50: '#f0f8ff',
    500: '#2f6f9f',  // Azul principal
    600: '#254e6f',  // Azul oscuro
  },
  accent: {
    DEFAULT: '#2f6f9f',
    strong: '#254e6f',
  },
  danger: '#ef4444',
  muted: '#6b7280',
}
```

### Componentes Base

#### Button
```typescript
<Button variant="primary">   {/* Acción principal */}
<Button variant="ghost">     {/* Acción secundaria */}
<Button variant="danger">    {/* Acción destructiva */}
```

#### Input
```typescript
<Input 
  label="Nombre"
  value={value}
  onChange={handleChange}
  error={error}
  placeholder="Texto"
/>
```

#### Card
```typescript
<Card 
  title="Título"
  subtitle="Descripción"
  actions={<Button>Acción</Button>}
>
  Contenido de la tarjeta
</Card>
```

## 📦 Gestión de Datos

### localStorage Schema

```typescript
// Keys
LS_RES = 'gestok_resources_v1'      // Resource[]
LS_USAGE = 'gestok_usage_v1'        // UsageLog[]
LS_RECIPES = 'gestok_recipes_v1'    // Recipe[]
LS_EXCHANGE = 'gestok_exchange_v1'  // ExchangeRate

// Estructura de datos en localStorage
{
  "gestok_resources_v1": [
    {
      "id": "id_abc123",
      "name": "Harina de trigo",
      "unit": "kg",
      "priceCLP": 1200,
      "priceUSD": 1.45,
      "stock": 50,
      "desc": "Harina para pan",
      "createdAt": "2025-11-29T10:30:00.000Z"
    }
  ],
  "gestok_usage_v1": [
    {
      "id": "id_def456",
      "resourceId": "id_abc123",
      "amount": 2.5,
      "ts": "2025-11-29T14:20:00.000Z",
      "notes": "Producción de pan"
    }
  ]
}
```

### Funciones de Persistencia

```typescript
// Guardar array
save<Resource>(LS_RES, resources)

// Cargar array
const resources = load<Resource>(LS_RES)

// Guardar objeto
saveObj<ExchangeRate>(LS_EXCHANGE, { rate: 830, ts: new Date().toISOString() })

// Cargar objeto
const exchangeRate = loadObj<ExchangeRate>(LS_EXCHANGE)
```

## 🔌 Integración con API Externa

### Exchange Rate API

```typescript
async function fetchExchangeRate(): Promise<ExchangeRate | null> {
  try {
    const res = await fetch(
      'https://api.exchangerate.host/latest?base=USD&symbols=CLP'
    )
    const j = await res.json()
    
    if (j && j.rates && j.rates.CLP) {
      const obj: ExchangeRate = { 
        rate: j.rates.CLP, 
        ts: new Date().toISOString() 
      }
      saveObj(LS_EXCHANGE, obj)
      return obj
    }
  } catch (e) {
    console.error('Exchange fetch error:', e)
  }
  
  return loadObj<ExchangeRate>(LS_EXCHANGE)
}
```

### Auto-actualización

```typescript
// En resourceStore
useEffect(() => {
  // Actualizar al cargar
  updateExchangeRate()
  
  // Actualizar cada 30 minutos
  const interval = setInterval(updateExchangeRate, 30 * 60 * 1000)
  return () => clearInterval(interval)
}, [])
```

## 🧪 Testing (Futuro)

### Estructura Recomendada

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
├── stores/
│   ├── resourceStore.ts
│   └── resourceStore.test.ts
└── utils/
    ├── helpers.ts
    └── helpers.test.ts
```

### Ejemplo de Test

```typescript
// helpers.test.ts
import { fmtCLP, genId } from './helpers'

describe('helpers', () => {
  test('fmtCLP formatea números correctamente', () => {
    expect(fmtCLP(1000)).toBe('1.000')
    expect(fmtCLP(1000000)).toBe('1.000.000')
  })
  
  test('genId genera IDs únicos', () => {
    const id1 = genId()
    const id2 = genId()
    expect(id1).not.toBe(id2)
    expect(id1).toMatch(/^id_[a-z0-9]{7}$/)
  })
})
```

## 🚀 Build y Deployment

### Proceso de Build

```bash
# 1. Type checking
npm run type-check

# 2. Linting
npm run lint

# 3. Build
npm run build

# Output: dist/
# ├── index.html
# ├── assets/
# │   ├── index-[hash].js
# │   └── index-[hash].css
```

### Optimizaciones de Vite

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        }
      }
    }
  }
})
```

### Deployment

Opciones de hosting:
1. **Vercel** (Recomendado)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

## 📊 Performance

### Métricas Objetivo

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3s
- **Bundle Size**: < 200KB (gzipped)

### Optimizaciones Implementadas

1. **Code Splitting**: Rutas lazy-loaded
2. **Tree Shaking**: Vite elimina código no usado
3. **Minificación**: CSS y JS minificados
4. **Barrel Exports**: `components/ui/index.ts`
5. **React.memo**: Para componentes pesados
6. **Zustand Selectors**: Evitar re-renders innecesarios

## 🔒 Seguridad

### Mejores Prácticas

1. **No hay backend**: Datos solo en el navegador del usuario
2. **No hay autenticación**: Aplicación de uso local
3. **Sanitización**: Input sanitizado antes de guardar
4. **Validación**: TypeScript + validadores en tiempo de ejecución
5. **HTTPS**: Requerido para API de tipo de cambio

### Content Security Policy (CSP)

```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
           script-src 'self' 'unsafe-inline'; 
           style-src 'self' 'unsafe-inline';
           connect-src 'self' https://api.exchangerate.host;">
```

## 📚 Recursos y Referencias

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Chart.js](https://www.chartjs.org/docs/)