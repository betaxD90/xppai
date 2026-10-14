# Extensibility and Chain of Command

Use extensions for standard application customization. Distinguish metadata extensions, extension classes, event handlers, and new custom elements. Do not default to overlayering Microsoft elements.

CoC requires the actual base signature, correct ExtensionOf target, and final extension class. Match argument/return types and static status; omit default values from wrapper parameters. Ordinary wrappers call next unconditionally and preserve the return value. Replaceable is an explicit exception, not permission to break arbitrary chains. Check Hookable(false), Wrappable(false), and final/Wrappable(true) combinations against the target method. Do not rely on extension ordering or wrap constructors.

Form roots, data sources, data fields, and controls are different targets. Check exact metadata names and supported nested methods; a compiled wrapper may not execute for an unsupported method. Version restrictions matter; next inside try/catch/finally is supported from platform update 21. Do not copy a blanket prohibition from an old guide.

Missing/conflicting base declarations require clarification or explicitly conditional guidance; never fabricate application signatures.

Sources: [Extensibility](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/extensibility/extensibility-home-page), [CoC](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/extensibility/method-wrapping-coc).

Reviewed: 2026-10-14. Platform documentation is not proof of the customer's installed build or runtime state.

