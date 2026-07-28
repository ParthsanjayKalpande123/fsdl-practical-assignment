# Assignment 07 — Feedback/Review App (React.js + Express + optional MongoDB)

## Aim
To build a full-stack feedback/review web application with a React.js frontend, an Express.js backend API, and optional MongoDB database support.

## Technologies Used
**Frontend (client/)**
- React.js 18
- CSS3 (custom in `App.css`)
- CRA (Create React App) toolchain

**Backend (server/)**
- Node.js
- Express.js
- cors
- uuid
- Mongoose (optional MongoDB ODM — included, commented out)

## Project Structure
```
source-code/
├── server/
│   ├── index.js        (Express API — port 5000)
│   └── package.json
└── client/
    ├── public/index.html
    ├── src/
    │   ├── index.js
    │   ├── App.js      (main component)
    │   └── App.css
    └── package.json    (proxy: http://localhost:5000)
```

## Steps Performed
1. **Backend**: Express server with in-memory `reviews` array; routes: `GET /api/reviews`, `GET /api/reviews?product=…`, `GET /api/reviews/stats`, `POST /api/reviews`, `DELETE /api/reviews/:id`.
2. **Frontend**: React App with components: `StarRating` (interactive 5-star picker) and `ReviewCard` (displays one review with delete action).
3. Stats bar fetched from `/api/reviews/stats` — shows total reviews, average rating, 5-star count.
4. Product filter bar dynamically filters the review list via API query.
5. CRA `proxy` field in `client/package.json` routes API calls to the Express server.

## Running Locally
**Terminal 1 — Backend:**
```bash
cd source-code/server
npm install
npm start
# API at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd source-code/client
npm install
npm start
# App at http://localhost:3000
```

## Output Description
- Purple gradient header with app title
- Stats chips showing total reviews, average rating, and 5-star count
- Two-panel layout: write-review form (left) + reviews list (right)
- Interactive star rating component in the form
- Product filter bar above reviews
- Each review card shows author, product, star rating, comment, date, and a delete button

## Output Screenshots
> Add screenshots of this running locally here.
