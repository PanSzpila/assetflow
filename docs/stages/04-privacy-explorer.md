# Stage 4 - Privacy Explorer

## Goal

Demonstrate Canton/Daml privacy and authorization boundaries with automated tests and an explorable UI.

## Scope

- Use a small set of demo parties.
- Define which parties should see which asset and trade contracts.
- Run tests for both expected access and expected denial.
- Present a privacy matrix with expected and observed visibility results.
- Avoid exposing hidden payloads merely to make the demo easier to display.

## Key principle

Privacy is not a frontend display setting. Hiding a row or field in React is not evidence of ledger privacy. Tests must verify what each party can actually observe or query through the supported ledger/application interfaces.

## Implementation tasks

1. Define visibility expectations for each contract and party.
2. Create Daml scenario tests for signatories, observers, and authorization.
3. Add backend test helpers that query as the relevant parties, using supported APIs.
4. Return safe test metadata to the UI without leaking protected contract data.
5. Build a matrix view: party, resource/contract category, expected visibility, observed result.
6. Add negative tests and document any limitations of the local environment.
7. Clearly distinguish a local demonstration from a public Canton deployment.

## Acceptance criteria

- Automated tests verify both allowed and denied visibility.
- The UI reports test outcomes without revealing the hidden data itself.
- Privacy claims are tied to repeatable tests and documented assumptions.
