/* Analytics hook — currently a no-op.
 *
 * Every challenge page loads this file and, where it logs events, guards
 * each call with `if (typeof window.logChallengeEvent === "function")`. As
 * shipped, this file defines that function but has it do nothing: no data
 * is collected, stored, or sent anywhere. This matches the platform's
 * stated privacy model (see docs/PRIVACY_AND_ACCESS.md — "The template
 * collects no student data and includes no analytics").
 *
 * To turn on real analytics (e.g. logging to a Google Apps Script
 * endpoint), replace the function body below — but first read
 * docs/PRIVACY_AND_ACCESS.md's "Student data and analytics" section and
 * follow its checklist (document collected fields, secure data in transit
 * and at rest, get institutional approval, update this file's own
 * comment and that privacy doc).
 */

window.logChallengeEvent = function () {
  // Intentionally inert. See the file comment above before adding logic here.
};
