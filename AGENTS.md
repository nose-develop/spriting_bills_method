<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Documentation Rules

- Before making implementation changes, read the relevant files in `documents/` and align the work with the documented screen flow, feature requirements, calculation design, and UI/component design.
- If a requested change conflicts with `documents/`, update the design documents first or explicitly note the mismatch before changing code.
- Keep future feature work consistent with the frontend-only policy: no login, no database, and no external API unless the design documents are intentionally revised.
