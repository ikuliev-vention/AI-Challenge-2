# Company Leaderboard — Project Report

## Tools and Environment

This project was built entirely inside Claude Code, Anthropic's AI-powered CLI, with VS Code open on the side for occasional visual reference. The frontend stack is React 18 with Vite as the build tool and Tailwind CSS for styling. Deployment is handled automatically by a GitHub Actions workflow that pushes the compiled output to GitHub Pages on every merge to `main` via the `JamesIves/github-pages-deploy-action`.

## Approach: Vibe Coding with AI Assistance

No application code was written by hand. Instead, I used a conversational, prompt-driven workflow I think of as vibe coding. The process started with a brainstorming session where I described the goal — a pixel-faithful replica of a company employee leaderboard — and asked the model to help me identify the right component decomposition. From that conversation I produced a short written spec, which then fed into a concrete implementation plan with sequenced subtasks. Each subtask was handed off to a subagent that had only the context it needed, keeping the work focused and preventing context bleed between unrelated concerns. I reviewed each output, gave corrective feedback where something deviated from the target, and moved on. The entire loop from blank project to working UI took a fraction of the time it would have taken writing code manually.

## UI Replication

I studied the original screenshots carefully before writing a single prompt, identifying every distinct visual region and noting spacing, typography weights, color values, and interactive states. That analysis translated into a straightforward component hierarchy: a `Header` bar with the company logo and navigation, a `Filters` row for date-range and department selectors, a `Podium` component that renders the top-three employees with large avatars and rank medals, a `LeaderboardList` that maps over the ranked data to render individual `LeaderRow` entries, and an `ActivityTable` showing a breakdown of contribution categories. Each component was generated in isolation and then composed at the page level, which made it easy to iterate on one region without accidentally breaking another.

## Data Replacement

All real employee information was replaced with fictional pop-culture characters drawn from Star Wars, the Marvel Cinematic Universe, Harry Potter, and similar universes. Names, job titles, and department labels were chosen to feel plausible in a corporate context while being entirely fictional — "Anakin Skywalker, Senior Engineer, Galactic Operations" and so on. Org codes follow the same structural pattern as the originals (two-letter prefix, four-digit suffix) but map to made-up division names. Rather than shipping placeholder images or scraped photos, avatars are generated on the fly from DiceBear's SVG API using each character's name as the seed, which gives every avatar a unique but deterministic appearance that requires no external assets or licensing considerations.

## Deployment

The GitHub Actions workflow triggers on every push to `main`. It checks out the repository, installs dependencies with `npm ci`, runs `npm run build`, and then uses `JamesIves/github-pages-deploy-action` to push the contents of the `dist` folder to the `gh-pages` branch. The Vite config sets `base: '/CompanyLeaderboard/'` so that all asset paths resolve correctly under the GitHub Pages subdirectory. The result is a fully automated pipeline: merge a change, and the live site updates within about a minute without any manual intervention.
