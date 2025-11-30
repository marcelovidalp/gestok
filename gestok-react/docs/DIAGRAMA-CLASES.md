# Diagrama de Clases - Gestok

## Diagrama UML de Clases Principal

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                          <<interface>>                          │
│                            Resource                              │
├─────────────────────────────────────────────────────────────────┤
│ + id: string                                                    │
│ + name: string                                                  │
│ + unit: string                                                  │
│ + priceCLP: number                                              │
│ + priceUSD: number                                              │
│ + stock: number                                                 │
│ + desc?: string                                                 │
│ + createdAt?: string                                            │
│ + updatedAt?: string                                            │
└─────────────────────────────────────────────────────────────────┘
                              △
                              │ uses
                              │
┌─────────────────────────────────────────────────────────────────┐
│                          <<interface>>                          │
│                            UsageLog                              │
├─────────────────────────────────────────────────────────────────┤
│ + id: string                                                    │
│ + resourceId: string ──────────────────────┐                   │
│ + amount: number                            │                   │
│ + ts: string                                │                   │
│ + notes?: string                            │                   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                              ┌───────────────┘
                              │ references
                              │
┌─────────────────────────────────────────────────────────────────┐
│                          <<interface>>                          │
│                        RecipeIngredient                          │
├─────────────────────────────────────────────────────────────────┤
│ + id: string                                                    │
│ + resourceId: string ──────────────────────┐                   │
│ + qty: number                               │                   │
└─────────────────────────────────────────────┼───────────────────┘
                              △               │
                              │ contains      │
                              │               │
┌─────────────────────────────┴───────────────┼───────────────────┐
│                          <<interface>>      │                   │
│                            Recipe           │                   │
├─────────────────────────────────────────────┼───────────────────┤
│ + id: string                                │                   │
│ + name: string                              │                   │
│ + ingredients: RecipeIngredient[]           │                   │
│ + costCLP: number                           │                   │
│ + costUSD: number                           │                   │
│ + created: string                           │                   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                              ┌───────────────┘
                              │ uses
                              │
┌─────────────────────────────────────────────────────────────────┐
│                          <<interface>>                          │
│                         ExchangeRate                             │
├─────────────────────────────────────────────────────────────────┤
│ + rate: number                                                  │
│ + ts: string                                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Diagrama de Stores (State Management)

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                         ResourceStore                            │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - resources: Resource[]                                         │
│ - exchangeRate: ExchangeRate | null                             │
│ - loading: boolean                                              │
│ - error: string | null                                          │
├─────────────────────────────────────────────────────────────────┤
│ Actions:                                                        │
│ + addResource(resource: Resource): void                         │
│ + updateResource(id: string, updates: Partial<Resource>): void  │
│ + deleteResource(id: string): void                              │
│ + updateExchangeRate(): Promise<void>                           │
│ + recalculateUSDPrices(rate: number): void                      │
│ + getTotalInventoryValue(): number                              │
│ + loadResources(): void                                         │
│ + setError(error: string | null): void                          │
└─────────────────────────────────────────────────────────────────┘
                              △
                              │ uses
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│                          UsageStore                              │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - usageLogs: UsageLog[]                                         │
├─────────────────────────────────────────────────────────────────┤
│ Actions:                                                        │
│ + addUsage(usage: UsageLog): void                               │
│ + deleteUsage(id: string): void                                 │
│ + deleteUsageByResource(resourceId: string): void               │
│ + getUsageByDateRange(from, to): UsageLog[]                     │
│ + getRecentLogs(limit?: number): UsageLog[]                     │
│ + loadUsageLogs(): void                                         │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                          RecipeStore                             │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - recipes: Recipe[]                                             │
├─────────────────────────────────────────────────────────────────┤
│ Actions:                                                        │
│ + addRecipe(recipe: Recipe): void                               │
│ + updateRecipe(id: string, updates: Partial<Recipe>): void      │
│ + deleteRecipe(id: string): void                                │
│ + loadRecipes(): void                                           │
└─────────────────────────────────────────────────────────────────┘
```

## Diagrama de Componentes UI

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                          <<Component>>                          │
│                             Layout                               │
├─────────────────────────────────────────────────────────────────┤
│ Props:                                                          │
│ - children: React.ReactNode                                     │
├─────────────────────────────────────────────────────────────────┤
│ Methods:                                                        │
│ - Navigation rendering                                          │
│ - Drawer management                                             │
│ - Route-aware active state                                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ contains
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌───────────────────────┐   ┌───────────────────────┐
│   <<Component>>       │   │   <<Component>>       │
│     Header            │   │   Navigation          │
├───────────────────────┤   ├───────────────────────┤
│ - Logo                │   │ - NavItems[]          │
│ - Title               │   │ - Active state        │
│ - Menu button         │   │ - Mobile drawer       │
└───────────────────────┘   └───────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                       UI Components Library                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  <<Component>>   │  │  <<Component>>   │  │  <<Component>>   │
│     Button       │  │      Input       │  │     Select       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Props:           │  │ Props:           │  │ Props:           │
│ - variant        │  │ - label          │  │ - label          │
│ - children       │  │ - error          │  │ - options[]      │
│ - onClick        │  │ - value          │  │ - value          │
│ - ...HTMLProps   │  │ - onChange       │  │ - onChange       │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  <<Component>>   │  │  <<Component>>   │  │  <<Component>>   │
│      Card        │  │      Table       │  │     Chart        │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Props:           │  │ Props:           │  │ Props:           │
│ - title          │  │ - columns[]      │  │ - type           │
│ - subtitle       │  │ - data[]         │  │ - data           │
│ - children       │  │ - emptyMessage   │  │ - options        │
│ - actions        │  │ - className      │  │ - height         │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Diagrama de Páginas (Views)

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                         Dashboard                                │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
│ - useUsageStore()                                               │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - KPI Cards (recursos, registros, valor inv.)                  │
│ - Exchange rate info                                            │
│ - Inventory chart (Bar)                                         │
│ - Monthly projection                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                         Resources                                │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - formData: { name, unit, priceCLP, stock, desc }              │
│ - editId: string | null                                         │
│ - error: string | null                                          │
├─────────────────────────────────────────────────────────────────┤
│ Methods:                                                        │
│ + handleSubmit()                                                │
│ + startEdit(resource)                                           │
│ + resetForm()                                                   │
│ + handleDelete(id)                                              │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - Resource form (Input components)                              │
│ - Resources table with actions                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                          Register                                │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
│ - useUsageStore()                                               │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - formData: { resourceId, amount, ts, notes }                  │
│ - error: string | null                                          │
├─────────────────────────────────────────────────────────────────┤
│ Methods:                                                        │
│ + handleSubmit()                                                │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - Resource selector (Select)                                    │
│ - Amount input                                                  │
│ - DateTime input                                                │
│ - Notes input                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                          Reports                                 │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
│ - useUsageStore()                                               │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - dateRange: { from, to }                                       │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - Date range filters                                            │
│ - Consumption chart by resource (Bar)                           │
│ - Recent logs table                                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                           Costs                                  │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
│ - useUsageStore()                                               │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - Update exchange rate button                                   │
│ - Resources table (CLP/USD prices)                              │
│ - Total inventory value                                         │
│ - Monthly projection                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      <<Page Component>>                         │
│                          Recipes                                 │
├─────────────────────────────────────────────────────────────────┤
│ Dependencies:                                                   │
│ - useResourceStore()                                            │
│ - useRecipeStore()                                              │
├─────────────────────────────────────────────────────────────────┤
│ State:                                                          │
│ - recipeName: string                                            │
│ - selectedResource: string                                      │
│ - quantity: string                                              │
│ - ingredients: RecipeIngredient[]                               │
├─────────────────────────────────────────────────────────────────┤
│ Methods:                                                        │
│ + addIngredient()                                               │
│ + removeIngredient(id)                                          │
│ + calculateCost()                                               │
│ + saveRecipe()                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Renders:                                                        │
│ - Recipe form                                                   │
│ - Ingredients list with costs                                   │
│ - Saved recipes list                                            │
└─────────────────────────────────────────────────────────────────┘
```

## Diagrama de Utilidades (Helper Functions)

```typescript
┌─────────────────────────────────────────────────────────────────┐
│                         <<Module>>                              │
│                     helpers.ts (Utils)                           │
├─────────────────────────────────────────────────────────────────┤
│ Storage Functions:                                              │
│ + load<T>(key: string): T[]                                     │
│ + save<T>(key: string, value: T[]): void                        │
│ + loadObj<T>(key: string): T | null                             │
│ + saveObj<T>(key: string, value: T): void                       │
├─────────────────────────────────────────────────────────────────┤
│ ID & Formatting:                                                │
│ + genId(): string                                               │
│ + fmtCLP(n: number): string                                     │
│ + nowISOLocal(): string                                         │
│ + formatDate(dateString: string): string                        │
├─────────────────────────────────────────────────────────────────┤
│ API & Calculations:                                             │
│ + fetchExchangeRate(): Promise<ExchangeRate | null>             │
│ + calculateMonthlyProjection(logs, resources): number           │
├─────────────────────────────────────────────────────────────────┤
│ Validation:                                                     │
│ + validateResource(data: Partial<Resource>): string | null      │
│ + validateUsage(data: Partial<UsageLog>): string | null         │
└─────────────────────────────────────────────────────────────────┘
```

## Relaciones y Dependencias

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Pages   │────────>│  Stores  │────────>│  Types   │
└──────────┘         └──────────┘         └──────────┘
     │                    │                     │
     │                    │                     │
     ▼                    ▼                     ▼
┌──────────┐         ┌──────────┐         ┌──────────┐
│ UI Comp. │         │  Utils   │         │   API    │
└──────────┘         └──────────┘         └──────────┘
     │                    │
     │                    │
     └────────────────────┘
            │
            ▼
      ┌──────────┐
      │localStorage│
      └──────────┘
```

## Patrón de Diseño Aplicado

### 1. **Singleton (Stores)**
Los stores de Zustand actúan como singletons, manteniendo un único estado global.

### 2. **Observer Pattern**
React y Zustand implementan el patrón Observer donde los componentes se suscriben a cambios de estado.

### 3. **Strategy Pattern**
Los validadores (`validateResource`, `validateUsage`) implementan diferentes estrategias de validación.

### 4. **Facade Pattern**
Los stores actúan como fachada, simplificando operaciones complejas de localStorage y lógica de negocio.

### 5. **Composition over Inheritance**
Los componentes UI se componen en lugar de heredar, promoviendo reutilización.