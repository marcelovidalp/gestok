# Diagramas de Casos de Uso - Gestok

## Diagrama General de Casos de Uso

```
                        Sistema Gestok
     ┌───────────────────────────────────────────────┐
     │                                                │
     │  ┌────────────────────────────────┐           │
     │  │  Gestionar Recursos            │           │
     │  │  - Crear recurso               │           │
     │  │  - Editar recurso              │◄─────┐    │
     │  │  - Eliminar recurso            │      │    │
     │  │  - Listar recursos             │      │    │
     │  └────────────────────────────────┘      │    │
     │                                           │    │
     │  ┌────────────────────────────────┐      │    │
     │  │  Registrar Consumo             │      │    │
     │  │  - Seleccionar recurso         │◄─────┤    │
     │  │  - Ingresar cantidad           │      │    │
     │  │  - Registrar fecha/hora        │      │    │
     │  │  - Agregar notas               │   ┌──────────┐
     │  └────────────────────────────────┘   │ Usuario  │
     │                                        └──────────┘
     │  ┌────────────────────────────────┐      │    │
     │  │  Consultar Reportes            │      │    │
     │  │  - Ver gráficos de consumo     │◄─────┤    │
     │  │  - Filtrar por fechas          │      │    │
     │  │  - Ver registros recientes     │      │    │
     │  └────────────────────────────────┘      │    │
     │                                           │    │
     │  ┌────────────────────────────────┐      │    │
     │  │  Gestionar Costos              │      │    │
     │  │  - Ver valor inventario        │◄─────┤    │
     │  │  - Actualizar tipo de cambio   │      │    │
     │  │  - Ver proyección mensual      │      │    │
     │  │  - Consultar precios USD       │      │    │
     │  └────────────────────────────────┘      │    │
     │                                           │    │
     │  ┌────────────────────────────────┐      │    │
     │  │  Gestionar Recetas             │      │    │
     │  │  - Crear receta                │◄─────┤    │
     │  │  - Agregar ingredientes        │      │    │
     │  │  - Calcular costo receta       │      │    │
     │  │  - Eliminar receta             │◄─────┘    │
     │  └────────────────────────────────┘           │
     │                                                │
     └────────────────┬───────────────────────────────┘
                      │
                      │ <<include>>
                      ▼
            ┌──────────────────────┐
            │  API Externa         │
            │  (exchangerate.host) │
            │  - Obtener tipo      │
            │    de cambio         │
            └──────────────────────┘
```

## Casos de Uso Detallados

### CU-01: Gestionar Recursos

**Actor Principal:** Usuario

**Descripción:** El usuario puede crear, editar, eliminar y listar recursos del inventario.

**Flujo Principal:**
1. Usuario accede a la sección "Recursos"
2. Sistema muestra formulario y lista de recursos existentes
3. Usuario completa datos del recurso:
   - Nombre
   - Unidad de medida
   - Precio en CLP
   - Stock inicial
   - Descripción (opcional)
4. Usuario hace clic en "Agregar"
5. Sistema valida los datos
6. Sistema guarda el recurso en localStorage
7. Sistema actualiza la lista de recursos

**Flujos Alternativos:**
- 5a. Datos inválidos: Sistema muestra mensaje de error
- 3a. Editar: Usuario selecciona recurso existente y modifica datos
- 3b. Eliminar: Usuario confirma eliminación y sistema borra recurso

**Postcondiciones:** Recurso creado/modificado/eliminado y guardado localmente

---

### CU-02: Registrar Consumo

**Actor Principal:** Usuario

**Descripción:** El usuario registra el consumo/uso de un recurso.

**Flujo Principal:**
1. Usuario accede a "Registros"
2. Sistema muestra formulario con lista de recursos disponibles
3. Usuario selecciona recurso del dropdown
4. Usuario ingresa cantidad consumida
5. Usuario selecciona fecha y hora (por defecto: ahora)
6. Usuario agrega notas opcionales
7. Usuario hace clic en "Registrar"
8. Sistema valida los datos
9. Sistema guarda el registro en localStorage
10. Sistema muestra confirmación

**Precondiciones:** Debe existir al menos un recurso

**Postcondiciones:** Registro de consumo guardado y disponible para reportes

---

### CU-03: Consultar Reportes

**Actor Principal:** Usuario

**Descripción:** El usuario visualiza reportes y gráficos de consumo.

**Flujo Principal:**
1. Usuario accede a "Reportes"
2. Sistema muestra gráfico de consumo por recurso
3. Sistema muestra tabla con registros recientes
4. Usuario opcionalmente filtra por rango de fechas
5. Sistema actualiza gráfico y datos según filtros

**Postcondiciones:** Usuario visualiza análisis de consumo

---

### CU-04: Gestionar Costos

**Actor Principal:** Usuario

**Descripción:** El usuario consulta costos, valor de inventario y proyecciones.

**Flujo Principal:**
1. Usuario accede a "Costos"
2. Sistema muestra tabla de recursos con precios CLP y USD
3. Sistema muestra valor total del inventario
4. Sistema muestra proyección mensual basada en historial
5. Usuario opcionalmente actualiza tipo de cambio manualmente
6. Sistema consulta API externa
7. Sistema recalcula precios en USD
8. Sistema actualiza la vista

**Precondiciones:** Tipo de cambio disponible (automático o manual)

**Postcondiciones:** Usuario visualiza costos actualizados

---

### CU-05: Gestionar Recetas

**Actor Principal:** Usuario

**Descripción:** El usuario crea recetas combinando múltiples recursos.

**Flujo Principal:**
1. Usuario accede a "Recetas"
2. Sistema muestra formulario de creación
3. Usuario ingresa nombre de la receta
4. Usuario selecciona ingrediente (recurso)
5. Usuario ingresa cantidad del ingrediente
6. Usuario hace clic en "Añadir ingrediente"
7. Sistema agrega ingrediente a la lista
8. Sistema calcula costo parcial en CLP y USD
9. Usuario repite pasos 4-7 para más ingredientes
10. Usuario hace clic en "Guardar receta"
11. Sistema guarda receta con costo total calculado
12. Sistema muestra receta en lista de recetas guardadas

**Postcondiciones:** Receta guardada con cálculo automático de costos

---

## Diagrama de Secuencia - Agregar Recurso

```
Usuario          UI (Resources)    resourceStore    localStorage    API Externa
  │                    │                 │                │              │
  │ 1. Completa form   │                 │                │              │
  │───────────────────>│                 │                │              │
  │                    │                 │                │              │
  │ 2. Click "Agregar" │                 │                │              │
  │───────────────────>│                 │                │              │
  │                    │                 │                │              │
  │                    │ 3. validateResource()            │              │
  │                    │────────────────>│                │              │
  │                    │                 │                │              │
  │                    │ 4. addResource()│                │              │
  │                    │────────────────>│                │              │
  │                    │                 │                │              │
  │                    │                 │ 5. save()      │              │
  │                    │                 │───────────────>│              │
  │                    │                 │                │              │
  │                    │                 │ 6. OK          │              │
  │                    │                 │<───────────────│              │
  │                    │                 │                │              │
  │                    │ 7. Success      │                │              │
  │                    │<────────────────│                │              │
  │                    │                 │                │              │
  │ 8. Re-render       │                 │                │              │
  │<───────────────────│                 │                │              │
  │                    │                 │                │              │
  │                    │ (Background: cada 30 min)        │              │
  │                    │                 │ 9. updateExchangeRate()       │
  │                    │                 │──────────────────────────────>│
  │                    │                 │                │              │
  │                    │                 │10. Exchange rate              │
  │                    │                 │<──────────────────────────────│
  │                    │                 │                │              │
  │                    │                 │11. recalculateUSDPrices()     │
  │                    │                 │────────────────>│              │
  │                    │                 │                │              │
```

---

## Diagrama de Estados - Recurso

```
        ┌───────────┐
        │  [Inicio] │
        └─────┬─────┘
              │
              │ Crear recurso
              ▼
        ┌───────────┐
    ┌───│   Activo  │───┐
    │   └───────────┘   │
    │         │         │
    │ Editar  │ Usar en │ Eliminar
    │ recurso │ registro│ recurso
    │         │         │
    └─────────┘         └──────┐
                               │
                               ▼
                        ┌──────────────┐
                        │  Eliminado   │
                        └──────────────┘
```

---

## Matriz de Trazabilidad

| Caso de Uso | Requisito Funcional | Componente UI | Store | Prioridad |
|-------------|-------------------|---------------|-------|-----------|
| CU-01 | RF-01: CRUD Recursos | Resources.tsx | resourceStore | Alta |
| CU-02 | RF-02: Registro consumo | Register.tsx | usageStore | Alta |
| CU-03 | RF-03: Reportes gráficos | Reports.tsx | usageStore | Media |
| CU-04 | RF-04: Gestión costos | Costs.tsx | resourceStore | Alta |
| CU-05 | RF-05: Recetas | Recipes.tsx | recipeStore | Media |
| CU-06 | RF-06: Dashboard | Dashboard.tsx | Todos | Alta |
| CU-07 | RF-07: Tipo de cambio | - | resourceStore | Alta |

---

## Requisitos No Funcionales

### RNF-01: Rendimiento
- Carga inicial < 2 segundos
- Interacciones UI < 100ms

### RNF-02: Usabilidad
- Interfaz responsive (móvil/tablet/desktop)
- Navegación intuitiva
- Feedback visual inmediato

### RNF-03: Seguridad
- Datos almacenados localmente (localStorage)
- Sin transmisión de datos personales
- API externa solo para tipo de cambio

### RNF-04: Compatibilidad
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Mobile-first design

### RNF-05: Mantenibilidad
- Código TypeScript tipado
- Componentes reutilizables
- Arquitectura modular