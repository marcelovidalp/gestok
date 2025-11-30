# 🚀 Guía de Inicio Rápido - Gestok

## Instalación y Ejecución

### Paso 1: Instalar Dependencias

```bash
cd gestok-react
npm install
```

Este comando instalará todas las dependencias necesarias:
- React 18.2
- TypeScript 5.3
- Vite 5.0
- Tailwind CSS 3.3
- Zustand 4.4
- Chart.js 4.4
- React Router DOM 6.20
- Lucide React (iconos)

### Paso 2: Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

### Paso 3: Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en el directorio `dist/`

## 📁 Estructura del Proyecto

```
gestok-react/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes UI (Button, Input, Card, etc.)
│   │   └── Layout.tsx   # Layout principal
│   ├── pages/           # Páginas (Dashboard, Resources, etc.)
│   ├── stores/          # State management (Zustand)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Funciones helper
│   ├── App.tsx          # Componente raíz
│   └── main.tsx         # Entry point
├── docs/                # Documentación técnica
│   ├── CASOS-DE-USO.md
│   ├── DIAGRAMA-CLASES.md
│   └── ARQUITECTURA.md
├── public/              # Archivos estáticos
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Características Principales

### 1. **Dashboard**
- KPIs: Total recursos, registros, valor inventario
- Gráfico de valor de inventario
- Tipo de cambio USD→CLP
- Proyección mensual

### 2. **Recursos**
- CRUD completo de recursos
- Precios en CLP y USD
- Control de stock
- Tabla responsive

### 3. **Registros**
- Registrar consumo de recursos
- Fecha y hora personalizables
- Notas opcionales

### 4. **Reportes**
- Gráficos de consumo por recurso
- Filtros por rango de fechas
- Tabla de registros recientes

### 5. **Costos**
- Valor total de inventario
- Precios en CLP y USD
- Actualización de tipo de cambio
- Proyección mensual basada en uso histórico

### 6. **Recetas**
- Crear recetas con múltiples ingredientes
- Cálculo automático de costos
- Ver recetas guardadas

## 🔧 Scripts Disponibles

```json
{
  "dev": "vite",                    // Desarrollo
  "build": "tsc && vite build",     // Build producción
  "lint": "eslint . --ext ts,tsx",  // Linter
  "preview": "vite preview",        // Preview build
  "type-check": "tsc --noEmit"      // Verificar tipos
}
```

## 🎨 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 18.2 | Framework UI |
| TypeScript | 5.3 | Tipado estático |
| Vite | 5.0 | Build tool |
| Tailwind CSS | 3.3 | Estilos |
| Zustand | 4.4 | State management |
| Chart.js | 4.4 | Gráficos |
| React Router | 6.20 | Routing |
| Lucide React | 0.294 | Iconos |

## 📝 Primeros Pasos

### 1. Agregar Primer Recurso

1. Navega a "Recursos"
2. Completa el formulario:
   - Nombre: Harina de trigo
   - Unidad: kg
   - Precio CLP: 1200
   - Stock: 50
3. Clic en "Agregar"

### 2. Registrar Consumo

1. Ve a "Registros"
2. Selecciona el recurso
3. Ingresa cantidad (ej: 2.5)
4. Clic en "Registrar"

### 3. Ver Reportes

1. Accede a "Reportes"
2. Visualiza gráfico de consumo
3. Filtra por fechas si lo deseas

### 4. Consultar Costos

1. Ve a "Costos"
2. Ve el valor de tu inventario
3. Actualiza tipo de cambio si es necesario
4. Revisa la proyección mensual

## 🔍 Verificar Tipos TypeScript

```bash
npm run type-check
```

Este comando verifica que no haya errores de tipos sin generar archivos de salida.

## 📦 Build Optimizado

El comando `npm run build` genera:
- Archivos minificados
- CSS optimizado con PurgeCSS
- Code splitting automático
- Source maps para debugging

## 🌐 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

## 🐛 Troubleshooting

### Problema: Errores de tipos TypeScript
**Solución:** Ejecuta `npm install` para instalar todas las dependencias de tipos.

### Problema: Puerto 3000 en uso
**Solución:** Cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 3001,  // Cambia el puerto
}
```

### Problema: Estilos de Tailwind no se aplican
**Solución:** Verifica que `postcss.config.js` y `tailwind.config.js` estén correctos.

## 📚 Documentación Adicional

- [README.md](../README.md) - Documentación general
- [CASOS-DE-USO.md](./CASOS-DE-USO.md) - Casos de uso detallados
- [DIAGRAMA-CLASES.md](./DIAGRAMA-CLASES.md) - Diagramas UML
- [ARQUITECTURA.md](./ARQUITECTURA.md) - Arquitectura técnica

## 💡 Tips

1. **Usa el type-check frecuentemente** para detectar errores de tipos temprano
2. **Los datos se guardan automáticamente** en localStorage
3. **El tipo de cambio se actualiza cada 30 minutos** automáticamente
4. **Todos los datos son privados** - nada se envía a servidores externos

## 🆘 Soporte

Si encuentras algún problema:
1. Verifica que todas las dependencias estén instaladas
2. Revisa la consola del navegador para errores
3. Ejecuta `npm run type-check` para verificar tipos
4. Consulta la documentación en `/docs`

---

¡Listo! Ya puedes empezar a usar Gestok 🎉