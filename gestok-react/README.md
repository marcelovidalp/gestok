# Gestok - Sistema de Gestión de Recursos y Costos

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 📋 Descripción

Gestok es una aplicación web moderna para la gestión eficiente de recursos, inventario y costos. Desarrollada con React, TypeScript, Vite y Tailwind CSS, ofrece una interfaz intuitiva y responsive para el control de recursos, registro de consumo, análisis de costos y creación de recetas.

## ✨ Características Principales

- 📦 **Gestión de Recursos**: Administra inventario con precios en CLP y USD
- 📊 **Análisis de Costos**: Visualización de costos con gráficos interactivos
- 📝 **Registro de Consumo**: Tracking detallado del uso de recursos
- 🧾 **Recetas**: Crea y administra recetas con cálculo automático de costos
- 💱 **Tipo de Cambio**: Actualización automática USD→CLP cada 30 minutos
- 📈 **Proyecciones**: Cálculo de proyección mensual basado en consumo histórico
- 💾 **Sin Backend**: Almacenamiento local (localStorage) - 100% privado
- 📱 **Responsive**: Diseño optimizado para móviles, tablets y desktop

## 🏗️ Arquitectura

### Stack Tecnológico

```
Frontend Framework:  React 18.2
Language:            TypeScript 5.3
Build Tool:          Vite 5.0
Styling:             Tailwind CSS 3.3
State Management:    Zustand 4.4
Charts:              Chart.js 4.4 + react-chartjs-2
Routing:             React Router DOM 6.20
Icons:               Lucide React
```

### Estructura del Proyecto

```
gestok-react/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes de UI
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── index.ts
│   │   └── Layout.tsx      # Layout principal con navegación
│   │
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Dashboard.tsx   # Panel principal con KPIs
│   │   ├── Resources.tsx   # Gestión de recursos
│   │   ├── Register.tsx    # Registro de consumo
│   │   ├── Reports.tsx     # Reportes y análisis
│   │   ├── Costs.tsx       # Análisis de costos
│   │   ├── Recipes.tsx     # Gestión de recetas
│   │   └── Help.tsx        # Ayuda y documentación
│   │
│   ├── stores/             # State management (Zustand)
│   │   ├── resourceStore.ts
│   │   ├── usageStore.ts
│   │   └── recipeStore.ts
│   │
│   ├── types/              # Definiciones TypeScript
│   │   └── index.ts        # Interfaces y tipos
│   │
│   ├── utils/              # Utilidades y helpers
│   │   └── helpers.ts      # Funciones auxiliares
│   │
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales
│
├── public/                 # Archivos estáticos
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
├── tailwind.config.js     # Configuración Tailwind
└── postcss.config.js      # Configuración PostCSS
```

## 📊 Diagramas

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                          CAPA DE PRESENTACIÓN                    │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │Resources │  │Register  │  │Reports   │ ...   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │             │              │             │               │
│       └─────────────┴──────────────┴─────────────┘               │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                      CAPA DE COMPONENTES UI                       │
│                            │                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │Button│  │Input │  │Card  │  │Table │  │Chart │  │Select│  │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  │
└────────────────────────────┼──────────────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                    CAPA DE LÓGICA DE NEGOCIO                     │
│                            │                                      │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ resourceStore   │  │ usageStore   │  │ recipeStore     │   │
│  │ (Zustand)       │  │ (Zustand)    │  │ (Zustand)       │   │
│  └────────┬────────┘  └──────┬───────┘  └────────┬────────┘   │
│           │                   │                    │             │
│           └───────────────────┼────────────────────┘             │
└───────────────────────────────┼──────────────────────────────────┘
                                │
┌───────────────────────────────┼──────────────────────────────────┐
│                      CAPA DE PERSISTENCIA                         │
│                                │                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              localStorage (Browser)                       │   │
│  │  - gestok_resources_v1   (recursos)                      │   │
│  │  - gestok_usage_v1       (registros de uso)              │   │
│  │  - gestok_recipes_v1     (recetas)                       │   │
│  │  - gestok_exchange_v1    (tipo de cambio)                │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                                │
┌───────────────────────────────┼──────────────────────────────────┐
│                       SERVICIOS EXTERNOS                          │
│                                │                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │   API exchangerate.host (Tipo de cambio USD→CLP)         │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Diagrama de Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Interacción
       ▼
┌─────────────────────────────────────────────┐
│          Componente React (Page)            │
│   - Llama acciones del store                │
│   - Actualiza estado local                  │
└──────┬──────────────────────────────────────┘
       │ Dispatch Action
       ▼
┌─────────────────────────────────────────────┐
│        Zustand Store (State Manager)        │
│   - Actualiza estado global                 │
│   - Ejecuta lógica de negocio               │
│   - Llama helpers/utilidades                │
└──────┬──────────────────────────────────────┘
       │ Read/Write
       ▼
┌─────────────────────────────────────────────┐
│            localStorage                      │
│   - Persiste datos en el navegador          │
└──────┬──────────────────────────────────────┘
       │ Subscribe
       ▼
┌─────────────────────────────────────────────┐
│        Componente React (Re-render)         │
│   - Recibe nuevo estado                     │
│   - Actualiza UI                            │
└─────────────────────────────────────────────┘
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm 9+ o yarn 1.22+

### Instalación

```bash
# Clonar o navegar al directorio del proyecto
cd gestok-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview build de producción
npm run preview
```

### Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "tsc && vite build",     // Build de producción
  "lint": "eslint . --ext ts,tsx",  // Linter
  "preview": "vite preview",        // Preview de build
  "type-check": "tsc --noEmit"      // Verificar tipos
}
```

## 🎨 Guía de Estilos

### Paleta de Colores

```css
/* Colores principales */
--accent: #2f6f9f;          /* Azul principal */
--accent-strong: #254e6f;   /* Azul oscuro */
--danger: #ef4444;          /* Rojo para acciones destructivas */
--muted: #6b7280;           /* Gris para texto secundario */
--bg: #f6f7f9;              /* Fondo general */
--card: #ffffff;            /* Fondo de tarjetas */
```

### Componentes Reutilizables

#### Button
```typescript
<Button variant="primary">Guardar</Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="danger">Eliminar</Button>
```

#### Input
```typescript
<Input 
  label="Nombre" 
  value={value}
  onChange={handleChange}
  error={errorMessage}
/>
```

#### Card
```typescript
<Card 
  title="Título" 
  subtitle="Subtítulo"
  actions={<Button>Acción</Button>}
>
  Contenido
</Card>
```

## 📖 Documentación de Componentes

### Stores (Zustand)

#### resourceStore
Gestiona el estado global de recursos e inventario.

**Estado:**
- `resources: Resource[]` - Array de recursos
- `exchangeRate: ExchangeRate | null` - Tipo de cambio actual
- `loading: boolean` - Estado de carga
- `error: string | null` - Mensaje de error

**Acciones:**
- `addResource(resource)` - Agregar nuevo recurso
- `updateResource(id, updates)` - Actualizar recurso existente
- `deleteResource(id)` - Eliminar recurso
- `updateExchangeRate()` - Actualizar tipo de cambio desde API
- `recalculateUSDPrices(rate)` - Recalcular precios en USD
- `getTotalInventoryValue()` - Obtener valor total del inventario

#### usageStore
Gestiona registros de consumo de recursos.

**Estado:**
- `usageLogs: UsageLog[]` - Array de registros de uso

**Acciones:**
- `addUsage(usage)` - Registrar nuevo consumo
- `deleteUsage(id)` - Eliminar registro
- `deleteUsageByResource(resourceId)` - Eliminar registros por recurso
- `getUsageByDateRange(from, to)` - Filtrar por rango de fechas
- `getRecentLogs(limit)` - Obtener registros recientes

#### recipeStore
Gestiona recetas y sus ingredientes.

**Estado:**
- `recipes: Recipe[]` - Array de recetas

**Acciones:**
- `addRecipe(recipe)` - Agregar nueva receta
- `updateRecipe(id, updates)` - Actualizar receta
- `deleteRecipe(id)` - Eliminar receta

## 🔐 Seguridad y Privacidad

- ✅ **Sin backend**: Todos los datos se almacenan localmente
- ✅ **Sin cookies**: No se utilizan cookies de terceros
- ✅ **Sin tracking**: No se envían datos a servidores externos
- ✅ **API externa**: Solo se consulta exchangerate.host para tipo de cambio (sin envío de datos personales)

## 🚀 Próximas Mejoras

- [ ] Exportar/importar datos (JSON, CSV)
- [ ] Modo oscuro
- [ ] Gráficos adicionales (líneas, pastel)
- [ ] Notificaciones de stock bajo
- [ ] Multi-idioma (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Backup en la nube (opcional)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

Desarrollado con ❤️ usando React + TypeScript + Vite + Tailwind CSS

---

© 2025 Gestok - Sistema de Gestión de Recursos y Costos