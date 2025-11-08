# Real Estate Management System

A modern Real Estate Management System built with Vue 3, TypeScript, and Tailwind CSS.

**Developer:** Raminder Jangao

## Features

- **Universal Login**: Single login page for both Admin and Client users
- **Client Registration**: Clients can register and create accounts (Admin registration is not available)
- **Role-based Access Control**: Separate dashboards for Clients and Admins
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Project Structure

```
src/
├── admin/           # Admin-specific components and pages
│   └── pages/
│       └── DashboardPage.vue
├── client/          # Client-specific components and pages
│   └── pages/
│       └── DashboardPage.vue
├── pages/           # Universal pages
│   └── auth/
│       ├── LoginPage.vue      # Universal login (Admin & Client)
│       └── RegisterPage.vue   # Client registration only
├── router/          # Vue Router configuration
├── stores/          # Pinia stores (authentication)
├── App.vue
├── main.ts
└── style.css
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Authentication

### Universal Login
Both Admin and Client users use the same login page at `/login`. The system automatically detects the user role based on credentials.

### Admin Credentials
- **Email**: admin@gmail.com
- **Password**: admin123
- **Note**: Admin accounts cannot be registered through the registration page. Only the predefined admin account is available.

### Client Registration
Clients can register through the registration page at `/register`. No pre-existing client accounts are required. After registration, clients can log in using the universal login page.

## Technologies Used

- Vue 3 (Composition API)
- TypeScript
- Vue Router
- Pinia (State Management)
- Tailwind CSS
- Vite

## Routes

- `/` - Redirects to registration page
- `/register` - Universal registration page (Client only)
- `/login` - Universal login page (Admin & Client)
- `/client/dashboard` - Client dashboard (requires authentication)
- `/admin/dashboard` - Admin dashboard (requires authentication)

