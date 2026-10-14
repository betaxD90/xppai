# X++ and transactions

D365FO X++ compiles to .NET CIL; do not carry over AX32 p-code or separate AX 2012 Full CIL generation instructions. Team declaration style is not a language limitation.

Preserve forUpdate and ttsLevel checks. Updates/deletes must honor the transaction scope where the row was selected for update. Nested commits do not independently commit the outer transaction. Do not catch inside tts on the assumption every exception can be handled there; check exception-specific rules.

retry restarts the associated try and removes Infolog messages since entering it. Bound retries and establish idempotence; never assume a retry macro's value. Database rollback does not undo external messages. Rethrow an exception when its identity/context must survive.

Infer no index, relation, query result, or performance gain without evidence. Respect current company by default; cross-company operations need a business requirement. Preserve framework validation/event behavior when changing writes.

Sources: [Language](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/dev-ref/xpp-language-reference), [Transactions](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/dev-ref/xpp-data/xpp-transaction), [Exceptions](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/dev-ref/xpp-exceptions).

Reviewed: 2026-10-14. Platform documentation is not proof of the customer's installed build or runtime state.
