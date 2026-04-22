# Invoice Management App

A responsive Invoice Management App built with React and TypeScript.

## Live Demo

https://invoice-management-tfxp.vercel.app/

## Setup

```bash
git clone https://github.com/Chavon007/invoice-management.git
cd invoice-management
npm install
npm run dev
```

## Features

- Create, Read, Update, Delete invoices
- Save as Draft / Mark as Paid
- Filter by status (All, Draft, Pending, Paid)
- Light / Dark mode (saved to LocalStorage)
- Form validation with error messages
- Fully responsive (Mobile, Tablet, Desktop)
- Data persisted via LocalStorage

## Tech Stack

- React + TypeScript
- React Router v6
- CSS Custom Properties for theming
- LocalStorage for persistence

## Architecture

State is managed with React Context. Routing handled by React Router. All styles use CSS variables for easy theming across light and dark mode.

## Trade-offs

- Used LocalStorage instead of a backend for simplicity
- Client-side ID generation (2 letters + 4 numbers)

## Accessibility

- Semantic HTML throughout
- All form fields have labels
- Color and text used together for status badges
- Keyboard navigable
