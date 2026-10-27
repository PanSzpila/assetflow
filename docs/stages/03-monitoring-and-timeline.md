# Stage 3 - Monitoring and Business Timeline

## Goal

Turn ledger updates into a useful business-facing activity timeline and status view.

## Scope

- Show events such as asset created, asset transferred, trade proposed, trade accepted, and settlement completed.
- Translate technical ledger updates into readable business events.
- Support filtering by asset, trade, event type, and time.
- Handle restarts, reconnects, and duplicate event delivery safely.

## Architecture

A long-running update consumer may be needed to read a continuous ledger update stream. Keep that consumer separate from ordinary request/response handlers. A short-lived web request should not own a permanent subscription.

The worker may write a derived read model if direct ledger queries are insufficient for the timeline. PostgreSQL is an option, not a prerequisite. The ledger remains authoritative for on-ledger state; the timeline is a derived presentation model.

## Implementation tasks

1. Identify the relevant update stream/API and required offsets or checkpoints.
2. Implement a worker/consumer with reconnect and resume behaviour.
3. Map technical updates to stable business-event types.
4. Make processing idempotent to tolerate duplicate events.
5. Add persistence only if the timeline needs durable indexed history.
6. Expose timeline/status endpoints.
7. Build activity UI with filters and empty/error states.
8. Test worker restart, duplicate events, event ordering, and lag.

## Acceptance criteria

- Users can inspect a chronological business timeline for assets and trades.
- The worker can recover after a restart without silently losing its place.
- Duplicate updates do not create duplicate business events.
- The UI clearly distinguishes current ledger state from derived timeline data.
