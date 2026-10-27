# Daml workspace

The initial package is `asset-model`. Its SDK version is pinned in `daml/asset-model/daml.yaml`.

Before implementing further:
- verify that Daml SDK 3.5.2 is the preferred stable release for the selected local Canton environment;
- run `dpm install package` from the package directory;
- run `dpm build` and `dpm test`;
- add scenario tests before relying on the sample `Asset` template.

The contract is intentionally a starting sketch, not a production-ready token standard. In particular, revisit whether `issuer` and `owner` should both be signatories, how unique identifiers are enforced, and how transfers should work when issuer and owner differ.
