# Metadata and integration

Data entities abstract application data and support integration/import/export. OData exposure depends on public entity configuration. Inspect supplied keys, public collection name, validation, data sources, company context, and operation contract; do not infer these from table names.

Distinguish OData, custom services, and data-management flows. AXD document services are replaced by data entities; legacy AIF inbound-port naming/configuration is not a D365FO recipe. Authentication does not establish authorization. Review contracts/payloads without live calls or customer credentials.

Extension-added enum values have nondeterministic integer assignments during synchronization. Do not depend on hardcoded numbers or ordering; use symbolic members and inspect consumers. This does not mean baseline enum members all have nondeterministic values.

For financial posting, inventory, dimensions, localization, workflow, or reports, request the relevant application source/metadata. Do not port unverified AX 2012 APIs.

Sources: [Entities](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/data-entities), [Services](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/services-home-page), [Enum extensions](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/extensibility/add-enum-value).

Reviewed: 2026-10-14. Platform documentation is not proof of the customer's installed build or runtime state.

