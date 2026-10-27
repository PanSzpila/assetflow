# Stage 1 - Asset Lifecycle

## Goal

Build the smallest useful vertical slice: create, list, inspect, and transfer a tokenized asset using Daml contracts, a Java API, and a Next.js + Material UI frontend.

## Scope

- Create a demo asset with a stable identifier, asset type, description, and owner.
- List only assets visible to the currently selected demo party.
- Show asset details and current owner.
- Transfer an asset from its current owner to a new owner with appropriate authorization.
- Display clear success and failure feedback.

## Contract design questions

Resolve these before writing the final contract:
- What is the asset identifier and how is uniqueness enforced?
- Who signs creation?
- Who must authorize a transfer?
- Which parties are signatories and which are observers?
- Is the asset represented by a single contract that is consumed/recreated on transfer?
- Which fields are public to involved parties, and which should remain private?

The UI must not be treated as the security boundary. Daml authorization and ledger visibility must enforce the rules.

## Implementation tasks

1. Create a Daml package and an `Asset` template.
2. Add Daml scenario tests for creation, valid transfer, wrong owner, and unauthorized transfer.
3. Add a Java ledger adapter and use cases for create/list/transfer.
4. Expose a small REST API with request/response DTOs.
5. Build the asset list, create form, details view, and transfer dialog in Next.js.
6. Use Material UI components and consistent loading/error states.
7. Add an integration test against a local Canton ledger.

## Out of scope

- Trade negotiation and DvP.
- Durable business-event history.
- Advanced privacy visualization.
- External legacy-system reconciliation.

## Acceptance criteria

- An asset can be created and is visible to the appropriate party.
- An authorized transfer changes the on-ledger owner.
- An unauthorized transfer is rejected.
- The UI reflects ledger outcomes rather than assuming success from a button click.
- Contract and integration tests cover the main success and failure paths.
