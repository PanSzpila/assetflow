# Architecture and Repository Layout

## Proposed repository tree

```text
assetflow/
├── apps/
│   └── web/                       # Next.js UI (App Router) + Material UI
│       ├── public/
│       ├── src/
│       │   ├── app/               # Routes, layouts, providers
│       │   ├── components/        # Reusable UI components
│       │   ├── features/          # Feature-oriented screens and UI logic
│       │   │   ├── assets/
│       │   │   ├── trades/
│       │   │   ├── activity/
│       │   │   └── privacy/
│       │   ├── lib/               # Browser-safe utilities and API client
│       │   └── theme/             # MUI theme and component overrides
│       ├── package.json
│       └── tsconfig.json
├── services/
│   └── api/                       # Java backend; add Spring Boot when needed
│       ├── src/main/java/com/assetflow/
│       │   ├── api/               # REST controllers / request DTOs
│       │   ├── application/       # Use cases and orchestration
│       │   ├── domain/            # Off-ledger domain concepts, not Daml copies
│       │   ├── ledger/             # Canton Ledger API adapter
│       │   └── config/
│       ├── src/test/java/
│       └── pom.xml
├── daml/
│   ├── asset-model/               # Asset and ownership contracts
│   ├── trade-model/               # Trade and DvP contracts (stage 2)
│   └── tests/                     # Cross-template / scenario tests if useful
├── infra/
│   ├── canton/                    # Local Canton configuration and scripts
│   └── docker/                    # Optional local dependencies later
├── docs/
│   ├── stages/
│   ├── ARCHITECTURE.md
│   └── IMPLEMENTATION-PLAN.md
├── package.json                   # npm workspace root
└── .gitignore
```

## Boundaries

### Next.js frontend

- Renders the user interface and calls the Java API.
- Uses Material UI for layout, tables, forms, dialogs, and feedback.
- Contains no Canton credentials and does not submit ledger commands directly.
- Can use Server Components for initial reads if useful, but keep ledger workflows behind the backend API.
- Avoid using Server Actions as a substitute for a well-defined application API.

### Java backend

The backend is the application boundary for identity/session checks, command validation, orchestration, and Canton integration.

Do not build a large service layer before it is needed. Stage 1 can begin with a thin Spring Boot service and one ledger adapter. If the chosen Canton local setup already provides a safe way to run initial experiments, keep the backend minimal but preserve the boundary.

Potential packages:
- `api`: HTTP contract exposed to the web app.
- `application`: use cases such as `CreateAsset`, `TransferAsset`, `ProposeTrade`, `AcceptTrade`.
- `domain`: off-ledger application types and policies only; do not duplicate Daml invariants here.
- `ledger`: commands, queries, party identity, and Ledger API mapping.
- `config`: configuration and dependency wiring.

### Daml contracts

Daml defines on-ledger state transitions and the rules that must hold atomically. Contract choices and authorization should reflect the parties involved. Avoid treating Daml as a generic database table model.

Use separate packages only when there is a real dependency or upgrade boundary. Initially, one Daml package is acceptable; split into `asset-model` and `trade-model` when stage 2 needs a clear dependency boundary.

### Persistence

No PostgreSQL in stage 1 by default. Add it only if we need:
- app-owned preferences or configuration;
- a durable read model for timeline/history;
- indexed queries that are unsuitable for direct ledger queries.

Never use an off-ledger database as the authority for asset ownership or settlement status.

## Integration flow

```text
Browser
  │ HTTPS / JSON
  ▼
Next.js UI ── calls ──► Java API
                           │
                           ▼
                    Ledger adapter
                           │ Ledger API / JSON Ledger API v2
                           ▼
                      Canton ledger
                           │
                           ▼
                     Daml contracts
```

Stage 3 may add a separately running event consumer/worker for long-lived update streams. Do not depend on a short-lived HTTP request handler to maintain a permanent subscription.

## Testing strategy

- Daml scenario tests: contract authorization, state transitions, rejected invalid actions.
- Java unit tests: use-case orchestration and mapping.
- Java integration tests: backend-to-ledger behaviour against a local ledger.
- Frontend tests: form validation, rendering and error states.
- End-to-end tests: a small number of important user journeys.
- Privacy tests: assert which parties can and cannot observe relevant contracts/events.

## Version policy

Pin the Daml SDK version in project configuration and record the compatible Canton distribution. This starter suggests Daml SDK `3.5.2` as a known 3.x baseline used by current Splice documentation; verify the latest stable compatible release before implementation. Avoid using a floating `latest` tag for reproducible builds.
