# TIA Payroll Front

A modern payroll management frontend application built with React, TypeScript, and Vite.

## Features

- **Dashboard** – Overview of key payroll metrics and recent activity
- **Employees** – Manage employee records with search and filtering
- **Payroll** – Process and manage payroll records per period
- **Reports** – Payroll summaries and headcount analytics by department

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) – fast build tooling
- [React Router v7](https://reactrouter.com/) – client-side routing
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) – unit testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── __tests__/        # Unit tests
├── components/       # Reusable UI components
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   └── StatusBadge.tsx
├── data/             # Mock data
│   └── mockData.ts
├── pages/            # Page components
│   ├── DashboardPage.tsx
│   ├── EmployeesPage.tsx
│   ├── PayrollPage.tsx
│   └── ReportsPage.tsx
├── types/            # TypeScript type definitions
│   └── index.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── setupTests.ts
```
