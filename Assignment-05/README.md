# Assignment 05 — College Information Site (Node.js + Express)

## Aim
To build a functional college information website using Node.js and Express for the backend, with optional MongoDB connection code included. The site runs on mock in-memory data if no database is configured.

## Technologies Used
- HTML5, CSS3, JavaScript (frontend — in `public/`)
- Bootstrap 5.3 (CDN)
- Node.js (backend runtime)
- Express.js (web framework)
- Mongoose (optional MongoDB ODM — included but commented out)

## Steps Performed
1. Initialized `package.json` with `express` and `mongoose` as dependencies.
2. Created `server.js` with:
   - In-memory data for college info, 5 departments, and 4 events.
   - API routes: `GET /api/college`, `GET /api/departments`, `GET /api/events`, `POST /api/inquiry`.
   - Static file serving for the `public/` folder.
   - Optional MongoDB connection block (commented out — uncomment and set `MONGO_URI` env var to enable).
3. Built `public/index.html` with a responsive Bootstrap layout:
   - Sticky navbar, hero section, departments grid, events grid, and inquiry form.
   - All data fetched from the Express API endpoints via `fetch()`.
   - Inquiry form POSTs JSON to `/api/inquiry` and displays the server response.

## Running Locally
```bash
cd source-code
npm install
npm start
# Visit http://localhost:3000
```

To enable MongoDB, set the `MONGO_URI` environment variable and uncomment the mongoose connection block in `server.js`.

## Output Description
A multi-section college portal showing:
- Top bar with contact info
- Sticky navbar with smooth scroll links
- Blue gradient hero with college name (fetched from API)
- Department cards with icons and student counts
- Events grid with dates and venue badges
- Inquiry form that POSTs to the Express server and shows a success message

## Output Screenshots
> Add screenshots of this running locally here.
