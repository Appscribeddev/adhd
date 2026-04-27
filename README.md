# ADHD Planner LP Stack

Initial deployable GTM LP implementation for ADH-22.

## Routes

- `/lp/a`
- `/lp/b`
- `/compare`

## Analytics + attribution

- Emits client events: `page_view`, `waitlist_signup`
- Captures and forwards first-touch/current-touch UTM fields:
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
- Waitlist API route: `POST /api/waitlist`

## Local run

```bash
npm install
npm run dev
```
