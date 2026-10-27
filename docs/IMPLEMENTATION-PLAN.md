# Implementation Plan

## Guiding approach

Deliver a vertical slice at each stage: contract rules, backend endpoint, UI, and tests. Keep scope small and avoid infrastructure that is not yet required.

## Stage 0 - Repository and development environment

This is setup work, not one of the four product stages.

- [ ] Confirm Node.js, npm, JDK, Maven and DPM versions.
- [ ] Generate the Next.js App Router app in `apps/web` with TypeScript.
- [ ] Add Material UI and its Next.js App Router integration.
- [ ] Add a minimal Java/Spring Boot API in `services/api`.
- [ ] Create the Daml package with a pinned 3.x SDK version.
- [ ] Choose and document a compatible local Canton setup.
- [ ] Add `.env.example`; keep secrets and local endpoints out of Git.
- [ ] Add lint/build/test commands and a short developer setup guide.
- [ ] Verify that the frontend starts, backend starts, and Daml package builds independently.

**Exit criteria:** a clean checkout can be set up from documented commands; web, API and Daml build/test entry points work independently.

## Stage 1 - Asset lifecycle

- [ ] Define the asset model and business rules.
- [ ] Define the parties and who may create, hold, transfer, or view an asset.
- [ ] Implement Daml contracts and scenario tests.
- [ ] Implement Java ledger adapter operations needed by the UI.
- [ ] Expose endpoints to list visible assets, create an asset, and transfer it.
- [ ] Build MUI pages for asset list, asset details, create form, and transfer dialog.
- [ ] Add loading, empty, success, and error states.
- [ ] Add integration tests for allowed and rejected actions.

**Exit criteria:** a user can create an asset, view assets visible to their party, and transfer an asset; unauthorized or invalid transfers fail at the ledger boundary.

## Stage 2 - Trading and atomic DvP

- [ ] Define trade lifecycle: proposal, acceptance, settlement, and rejection/cancellation rules.
- [ ] Decide how cash/payment is represented for the portfolio demo; document simplifications.
- [ ] Implement Daml contracts that ensure delivery and payment succeed or fail atomically.
- [ ] Define signatories, observers, and required authorizers for each transition.
- [ ] Add Java use cases and endpoints for proposing, accepting, and settling trades.
- [ ] Add UI for trade ticket, pending trades, and trade details.
- [ ] Test insufficient funds, wrong owner, stale proposal, duplicate execution, and authorization failures.
- [ ] Add an end-to-end test for a successful DvP and at least one failed DvP.

**Exit criteria:** the demo can show a successful atomic DvP and prove that a failure does not leave only one leg settled.

## Stage 3 - Monitoring and business timeline

- [ ] Identify which ledger updates are required for the timeline.
- [ ] Implement a dedicated long-running consumer/worker for updates if the chosen API requires it.
- [ ] Translate ledger events into business events such as “Trade proposed”, “Trade accepted”, and “Settlement completed”.
- [ ] Decide whether durable history requires a PostgreSQL read model; add it only if justified.
- [ ] Expose timeline and status endpoints.
- [ ] Build asset/trade activity screens with filters and clear error/connection states.
- [ ] Add reconnect, checkpoint/resume, duplicate-event and ordering tests.
- [ ] Document the difference between ledger state and the application’s derived read model.

**Exit criteria:** the UI presents a useful business timeline that recovers from worker restarts and does not silently misrepresent derived history as authoritative ledger state.

## Stage 4 - Privacy explorer

- [ ] Define a small set of demo parties and example contracts.
- [ ] Document expected visibility for each party and each contract type.
- [ ] Create test scenarios for permitted visibility and denied visibility.
- [ ] Implement a backend view that reports the test results without leaking hidden contract payloads.
- [ ] Build a privacy matrix UI showing party × contract/event × expected/observed visibility.
- [ ] Include negative tests proving that a party cannot query data it should not see.
- [ ] Document what is demonstrated locally and what is not a claim about public-network deployment.

**Exit criteria:** the project demonstrates privacy through ledger authorization/visibility behaviour and automated tests, not merely by hiding fields in the frontend.

## Suggested order of work

1. Make the repository build and start.
2. Implement one minimal asset contract and its tests.
3. Connect the Java API to the local ledger.
4. Build the first MUI screen against the API.
5. Complete stage 1 before adding trade complexity.
6. Add one stage at a time, keeping tests and documentation in sync.
