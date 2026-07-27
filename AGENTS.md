<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Frontend design skill (default for design work)

This project vendors Anthropic's official `frontend-design` skill at
`.claude/skills/frontend-design/SKILL.md` (from
https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design).

**Invoke it via the Skill tool whenever the task involves visual/UI/UX design
decisions for this site** — new sections, redesigns, typography, color,
layout, motion — not just "write some code that renders." It pushes toward a
distinctive, deliberate aesthetic (named palette, intentional type pairing,
one real signature element) instead of generic AI-template defaults, which
matches this client's explicit, repeated feedback ("se ve hecho con IA / PowerPoint").
Skip it for pure logic/plumbing changes with no visual surface.

# UI/UX Pro Max skill (also default for design work)

This project also vendors the `ui-ux-pro-max` skill at
`.claude/skills/ui-ux-pro-max/SKILL.md` (from
https://github.com/nextlevelbuilder/ui-ux-pro-max-skill — only the
`ui-ux-pro-max` sub-skill was copied in; the repo's other sub-skills
(banner-design, brand, design, slides, ui-styling) are print/logo/slide-deck
focused and not relevant to this project, so they were intentionally left
out). It's a searchable local database (CSV, queried via a stdlib-only Python
script — no network, no third-party packages) of UI styles, color palettes,
font pairings, UX guidelines, and stack-specific guidance (includes
Next.js/Tailwind data relevant here).

**Use it alongside `frontend-design`** for the same kind of visual/UI work —
it's a good source for color palette and font-pairing options, UX
anti-pattern checks, and stack-specific implementation guidance. `frontend-design`
is the higher-level judgment/taste guide (avoiding generic AI aesthetics);
`ui-ux-pro-max` is the reference database to pull concrete options from.
