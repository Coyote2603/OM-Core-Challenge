# Periodic Review, Quality & Planning Challenge

The fourth practice set, covering three distinct core OM topics in one 14-question set: periodic review inventory policies (4 questions), statistical quality control (5 questions), and aggregate production planning (5 questions). Unlike the Inventory Management Challenge (one theme, meant to grow), this one groups three separate topics into a single challenge, matching how the source question bank was authored.

## Learning design

Across 14 worked problems, a learner:

1. reads a short scenario with the numbers needed to solve it;
2. commits to one of four answer options;
3. if the choice is wrong, receives a hint written for that specific misconception and can try again immediately; and
4. once correct, sees the full worked solution rather than only the final number.

## Files

- `pqp-challenge.html` contains the learner-facing page structure and introductory copy.
- `css/om-challenge.css` is shared, unmodified, with the other challenges.
- `js/pqp-challenge.js` contains the question data (`PQP_CHALLENGE_QUESTIONS`) and the interaction logic — a fully independent copy of the same pattern, `pqp`-prefixed so it never collides with the other challenges' globals.
- `scripts/test-pqp-challenge.mjs` validates the question data shape: exactly four options per question, exactly one marked correct, every incorrect option carrying a non-empty hint, and the correct option carrying a non-empty solution.

`js/site-config.js` controls the activity's card shown elsewhere on the platform. `js/tutorial-login.js`'s `CHALLENGE_ACCESS` array controls this challenge's own, separate access code.

## Change or add questions

Questions live in `PQP_CHALLENGE_QUESTIONS` in `js/pqp-challenge.js`, grouped by topic with a comment marking each section (periodic review, quality management, aggregate planning). Each question has:

- `kicker`, `title`, and `context` (trusted HTML);
- `question`, the prompt shown above the options; and
- `options`, an array of exactly four entries, each with `key`, `text`, `correct`, and either `hint` (incorrect options) or `solution` (the one correct option, trusted HTML; KaTeX math uses `\\(` / `\\)` delimiters).

After editing, run `npm test` to re-validate the shape. It cannot verify that the arithmetic is correct — re-derive every changed number by hand and click through the page before publishing.

## Randomization and privacy

Same model as the other challenges: no persistent score, nothing submitted to a server, no identity stored. Progress lives only in page memory for the current visit.
