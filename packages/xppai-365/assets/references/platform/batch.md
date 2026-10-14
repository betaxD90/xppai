# Batch and SysOperation

Inspect supplied controller, contract, service, and execution mode. Consider serialized parameters, company, identity, noninteractive execution, and repeated effects; do not invent framework relationships.

Distinguish task retry configuration from retries for transient SQL connection failures. BatchRetryable and idempotent configuration can enable automatic transient retries; flags do not establish business idempotence.

When relying on the framework's transient handling, preserve TransientSqlConnectionError. Catching it and throwing Exception::Error prevents recognition of the original failure. Use an appropriate rethrow preserving the original exception, and inspect catch/transaction context. Do not add broad catches or retry external effects without duplicate prevention.

Sources: [Batch retries](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/sysadmin/retryable-batch), [Exception handling](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/dev-ref/xpp-exceptions).

Reviewed: 2026-10-14. Platform documentation is not proof of the customer's installed build or runtime state.
