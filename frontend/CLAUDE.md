@AGENTS.md

# Model
Always use claude-sonnet-4-6 for all tasks.

# Mission
Build the ServiceHive Smart Leads Dashboard assignment.
Follow AGENTS.md frontend-design-skill section for every UI decision.
Never skip the aesthetic direction. Never produce generic UI.

# Priorities
1. TypeScript strict — zero `any` unless justified with a comment
2. Every component typed with proper interfaces from types/
3. Follow the exact folder structure defined in AGENTS.md
4. Dark mode is default — not a toggle afterthought
5. Skeleton loaders always — never raw spinners for data fetching
6. All filters must work together — combined query params
7. Backend pagination only — no client-side pagination
8. Debounced search — 400ms delay with visual indicator
9. RBAC enforced on both frontend routes and backend middleware
10. CSV export must work with current active filters applied