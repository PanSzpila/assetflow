# Stage 2 - Trading and Atomic DvP

## Goal

Model a trade between two parties and demonstrate delivery-versus-payment (DvP): the asset leg and payment leg settle atomically.

## Scope

- A seller proposes a trade for an asset.
- A buyer reviews and accepts the proposal.
- Settlement transfers the asset and the agreed payment as one atomic ledger transaction.
- Invalid, unauthorized, stale, or underfunded trades fail without a partial settlement.

## Design decisions

- Define a minimal trade lifecycle and its allowed state transitions.
- Decide whether payment is represented by a demo cash token, a balance contract, or another explicitly documented simplified model.
- Define the relationship between the trade contract, asset contract, and payment contract.
- Make authorization explicit: the parties required to approve a trade must be able to authorize the atomic transaction.
- Avoid implying that the demo token is a regulated stablecoin or production money instrument.

## Implementation tasks

1. Write down lifecycle states and invariants before coding.
2. Implement Daml trade and payment model changes.
3. Add scenario tests for successful settlement and failure cases.
4. Add Java application use cases and API endpoints.
5. Build trade creation, pending trades, and trade detail screens.
6. Display trade status from ledger-derived results.
7. Add an end-to-end test proving both legs settle together or neither does.

## Important failure cases

- Buyer does not have sufficient demo funds.
- Seller no longer owns the asset.
- Trade proposal has already been consumed or is no longer valid.
- A party without the required authority tries to accept or settle.
- A duplicate request attempts to execute the same trade twice.

## Acceptance criteria

- Successful DvP transfers both asset and payment in one atomic transaction.
- Failed DvP leaves no partially settled result.
- The API and UI surface actionable errors without bypassing contract rules.
