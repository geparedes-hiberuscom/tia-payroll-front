# payrol

Proyecto React con Arquitectura Hexagonal / Clean Architecture.

- **Módulo**: Roles de Pago / Nómina (AvPy)
- **Versión**: 1.0.0
- **React**: 18, **TypeScript**, **Vite**
- **State**: Zustand
- **HTTP**: Axios
- **Router**: React Router DOM v6

## Módulos

- **setup**: 🔧 Setup y Configuración — Parámetros, tabla IR, plantillas contables [High]
- **rubros**: 📋 Gestión de Rubros — Rubros, conceptos e IDO [High]
- **procesos**: ⚙️ Procesos de Nómina — Ejecutar procesos (quincena, mensual, etc) [High]
- **consultas**: 👤 Consultas — Nómina por colaborador, acumulados [High]
- **pago**: 🏦 Pago y Acreditación — Acreditaciones bancarias [Medium]
- **prestamos**: 💰 Préstamos — Préstamos, anticipos, sobregiros, endeudamiento [High]
- **costos**: 💼 Distribución de Costos — Distribución por centro de costo [Medium]
- **beneficios**: 🎁 Beneficios Especiales — Vales, provisiones, CrediTIA [High]
- **integraciones**: 🔗 Integraciones Externas — IESS y Contable [High]
- **reportes**: 📊 Reportes — Reportes y análisis [Low]
- **shared**: Excepciones base, httpClient, componentes comunes

## Dependencias entre slices

- slice-1-setup → 
- slice-2-rubros → slice-1-setup
- slice-3-procesos → slice-1-setup, slice-2-rubros
- slice-4-consultas → slice-3-procesos
- slice-5-pago → slice-3-procesos
- slice-6-prestamos → slice-4-consultas
- slice-7-costos → slice-2-rubros, slice-3-procesos
- slice-8-beneficios → slice-3-procesos
- slice-9-integraciones → slice-3-procesos
- slice-10-reportes → slice-3-procesos, slice-4-consultas

## Estructura hexagonal por módulo

```
src/modules/<module>/
├── domain/
│   ├── model/          → Interfaces TypeScript del dominio
│   └── exception/      → Errores de negocio custom
├── application/
│   ├── port/
│   │   ├── input/      → Interfaces de casos de uso (InputPort)
│   │   └── output/     → Interfaces de infraestructura (OutputPort)
│   └── service/        → Implementación de casos de uso
├── infrastructure/
│   ├── input/
│   │   └── adapter/
│   │       ├── components/  → React Components (presentational)
│   │       ├── pages/       → React Pages (container/smart)
│   │       ├── hooks/       → Custom hooks (conectan UI ↔ Service)
│   │       ├── mapper/      → View mappers (DTO ↔ Domain)
│   │       ├── dto/         → DTOs de vista (Request/Response)
│   │       └── config/      → Configuración del módulo
│   └── output/
│       └── adapter/
│           ├── api/         → Adaptadores API REST (Axios)
│           ├── mapper/      → API mappers (API DTO ↔ Domain)
│           ├── validator/   → Validadores de negocio
│           └── storage/     → LocalStorage / SessionStorage
└── __tests__/
    ├── domain/
    ├── application/
    └── infrastructure/
```

## Quick Start

```bash
npm install
npm run dev
```

## Test

```bash
npm test
npm run test:coverage
```

---
Generado automáticamente por Migration Flow Extension
