# Transaction Management MFE

Angular microfrontend responsible for transaction history and creation within the [Distributed Banking Platform](#related-repositories). Built as an independently deployable remote using **Native Federation**, designed to be loaded dynamically into the [Shell](#related-repositories) host application under the `/transactions` route.

## Overview

- **Transaction history** — lists a user's transactions with type, amount, status (`PENDING`/`COMPLETED`/`FAILED`), and real-time fraud risk level (`LOW`/`MEDIUM`/`HIGH`) returned by the backend's fraud detection engine
- **Create transaction** — a form supporting deposits, withdrawals, and transfers, submitted to the Transaction Management Service with a client-generated idempotency key to guard against accidental duplicate submissions

This app has no authentication logic of its own — it assumes it is only ever reached after a user has already authenticated via the Account MFE, and reads the existing session token rather than managing login itself.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 (standalone components, esbuild Application Builder) |
| State Management | NgRx (Store, Effects, DevTools) |
| Microfrontend | Native Federation (`@angular-architects/native-federation`) |
| Styling | SCSS, mobile-first responsive design, CSS custom properties |
| HTTP | Angular `HttpClient` with a JWT-attaching interceptor |

## Architecture Notes

**Relative routing.** This app's routes (`app.routes.ts`) are defined relative (`''`, `'new'`), not absolute. This is intentional: when Shell mounts this remote under its `/transactions` prefix, the relative paths compose correctly into `/transactions` and `/transactions/new` without any hardcoded path assumptions inside this app.

**Federation-aware state registration.** Same pattern as Account MFE: the `transactions` NgRx feature state and its effects are registered at the route level (`app.routes.ts`), not the root config, so state initializes correctly regardless of which host loads this remote.

**Token handling — intentionally not NgRx.** Since this app never performs login, reading a stored token isn't really application *state* in the reactive sense — there's no loading/success/error lifecycle to model. A plain `TokenService` reads directly from `localStorage`, avoiding unnecessary NgRx ceremony for what is fundamentally a single `getItem` call.

**Duplicate submission protection.** Every transaction creation request includes a unique idempotency key generated client-side, in addition to the `exhaustMap` RxJS operator in the create-transaction effect, which ignores rapid repeat dispatches (e.g., a user double-clicking submit) until the first request resolves.

## Project Structure

```
src/app/
├── core/
│   ├── guards/          # authGuard — checks for an existing token
│   ├── interceptors/    # JWT-attaching HTTP interceptor
│   ├── services/        # TransactionService (API calls), TokenService
│   └── models/          # Transaction, CreateTransactionRequest interfaces
├── shared/
│   ├── components/
│   ├── pipes/
│   └── directives/
├── features/
│   ├── transaction-history/
│   └── create-transaction/
├── store/
│   └── transactions/    # NgRx actions, reducer, effects, selectors
├── app.config.ts
└── app.routes.ts         # Exposed via Native Federation as './routes'
```

## Getting Started

### Prerequisites

- Node.js 22.12+
- Angular CLI 22+
- [Transaction Management Service](#related-repositories) running locally on `localhost:8081`, including its supporting infrastructure (PostgreSQL, MongoDB, Redis, Kafka — see that repo's README for `docker-compose` setup)

### Install & Run (Standalone)

```bash
npm install
ng serve --port 4202
```

Visit `http://localhost:4202`.

> **Note:** Since this app has no login of its own, standalone testing requires manually seeding a token obtained from Account MFE:
> ```javascript
> // In the browser console at localhost:4202
> localStorage.setItem('auth_token', 'PASTE_TOKEN_HERE')
> ```
> For the full authenticated flow, run this app alongside Shell and Account MFE — see [Running the Full Platform](#related-repositories).

## Environment Configuration

`src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  transactionApiUrl: 'http://localhost:8081',
};
```

## Roadmap

- [ ] Replace `localStorage` token reads with a BFF + session-cookie pattern (see backend and Account MFE roadmaps)
- [ ] Extract shared SCSS design tokens into a shared package
- [ ] Add a feedback loop reflecting real-time transaction status updates (currently transactions may remain in `PENDING` until the backend's Kafka consumer completes processing)

---

This is one component of a larger system. For the full architecture, repository links, and how to run everything together, see the [Distributed Banking Platform](#) overview repository.
