# Assignment 08 — MERN Mini Project: Full-Stack Task Manager (TaskFlow)

## Aim
To build a complete, end-to-end full-stack MERN (MongoDB, Express, React, Node.js) application implementing CRUD operations — a Task Manager with a Kanban-style board.

## Technologies Used
**Frontend (client/)**
- React.js 18
- CSS3 (custom Kanban board styling in `App.css`)
- CRA toolchain

**Backend (server/)**
- Node.js + Express.js
- Mongoose (MongoDB ODM — connects to DB if available, falls back to in-memory)
- cors, uuid

## Project Structure
```
source-code/
├── server/
│   ├── index.js          (Express API — port 5001, Mongoose + in-memory fallback)
│   └── package.json
└── client/
    ├── public/index.html
    ├── src/
    │   ├── index.js
    │   ├── App.js        (main component — Kanban board with CRUD)
    │   └── App.css
    └── package.json      (proxy: http://localhost:5001)
```

## Steps Performed
1. **Mongoose Model**: `Task` schema with fields: `title`, `description`, `priority` (Low/Medium/High), `status` (Todo/In Progress/Done), `dueDate`, `timestamps`.
2. **Smart fallback**: Server tries to connect to MongoDB on startup. If MongoDB is not available, all API calls transparently use the in-memory `tasks` array via helper functions (`getTasks`, `createTask`, `updateTask`, `deleteTask`).
3. **REST API**:
   - `GET /api/tasks` — all tasks sorted by creation date (newest first)
   - `GET /api/tasks/stats` — counts by status
   - `POST /api/tasks` — create new task
   - `PUT /api/tasks/:id` — update task (used for edits and status advance)
   - `DELETE /api/tasks/:id` — delete task
4. **React Kanban Board**: Three columns (Todo / In Progress / Done). Each task card shows title, description, priority badge, due date, and action buttons.
5. **Status flow**: Each task has a "→ Next Status" button that cycles Todo → In Progress → Done → Todo.
6. **Edit**: Clicking edit fills the add-form at the top; submitting updates the task via PUT.
7. **Stats row**: Shows total, Todo, In Progress, and Done counts (live from API).

## Running Locally

**With MongoDB (full MERN):**
1. Make sure MongoDB is running locally (`mongod`)
2. Optionally set `MONGO_URI` env var (defaults to `mongodb://localhost:27017/task_manager`)

**Without MongoDB (in-memory fallback):**
No setup needed — just run the server and it will auto-use in-memory data.

**Terminal 1 — Backend:**
```bash
cd source-code/server
npm install
npm start
# API at http://localhost:5001
```

**Terminal 2 — Frontend:**
```bash
cd source-code/client
npm install
npm start
# App at http://localhost:3000
```

## Output Description
- Dark blue/purple themed dashboard header
- 4 live stat chips: Total / Todo / In Progress / Done
- Task add/edit form with title, priority (Low/Medium/High), due date, description
- 3-column Kanban board with task cards
- Each card: title, description, colour-coded priority badge, due date, status-advance button, edit button, delete button
- Real-time board updates after every Create/Update/Delete action

## Output Screenshots
> Add screenshots of this running locally here.
