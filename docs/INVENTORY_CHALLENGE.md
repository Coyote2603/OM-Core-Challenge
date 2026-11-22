# Inventory Management Challenge

The Inventory Management Challenge is a third practice set alongside the OM Core Challenge and the Newsvendor Challenge. It starts with the newsvendor model and the economic order quantity, and is designed to grow: more inventory topics can be appended later without touching any other file.

## Learning design

Across worked problems on inventory decisions, a learner:

1. reads a short scenario with the numbers needed to solve it;
2. commits to one of four answer options;
3. if the choice is wrong, receives a hint written for that specific misconception and can try again immediately; and
4. once correct, sees the full worked solution rather than only the final number.

## Files

- `inventory-challenge.html` contains the learner-facing page structure and introductory copy.
- `css/om-challenge.css` is shared, unmodified, with the OM Core and Periodic Review/Quality/Planning Challenges (class-based selectors only, so sharing it across pages is safe).
- `js/inventory-challenge.js` contains the question data (`INVENTORY_CHALLENGE_QUESTIONS`) and the interaction logic — a fully independent copy of `js/om-challenge.js`'s pattern, `inv`-prefixed so it never collides with the other challenges' globals.
- `scripts/test-inventory-challenge.mjs` validates the question data shape. Unlike the OM Core Challenge's test, this one allows a zero-length question array (the page then shows a "coming soon" state) since this challenge is meant to start small and grow.

`js/site-config.js` controls the activity's card shown elsewhere on the platform. `js/tutorial-login.js`'s `CHALLENGE_ACCESS` array controls this challenge's own, separate access code.

## Add more inventory topics later

Append new question objects to `INVENTORY_CHALLENGE_QUESTIONS` in `js/inventory-challenge.js` — no other file needs to change. Each question has:

- `kicker`, `title`, and `context` (trusted HTML);
- `question`, the prompt shown above the options; and
- `options`, an array of exactly four entries, each with `key`, `text`, `correct`, and either `hint` (incorrect options) or `solution` (the one correct option, trusted HTML; KaTeX math uses `\\(` / `\\)` delimiters).

After editing, run `npm test` to re-validate the shape. It cannot verify that the arithmetic is correct — re-derive every changed number by hand and click through the page before publishing.

## Randomization and privacy

Same model as the other challenges: no persistent score, nothing submitted to a server, no identity stored. Progress lives only in page memory for the current visit.
