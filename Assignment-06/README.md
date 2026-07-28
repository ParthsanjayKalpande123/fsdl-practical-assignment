# Assignment 06 — Appointment Booking App (Node.js + Express)

## Aim
To build a functional appointment booking web application using Node.js and Express for the backend, with a full CRUD interface (Create, Read, Delete) for appointments. Optional MongoDB integration is included via Mongoose but the app runs on in-memory data by default.

## Technologies Used
- HTML5, CSS3, Bootstrap 5.3, JavaScript (frontend — in `public/`)
- Node.js (runtime)
- Express.js (web framework)
- uuid (for generating unique appointment IDs)
- Mongoose (optional MongoDB ODM — included but commented out)

## Steps Performed
1. Created `package.json` with `express`, `uuid`, and `mongoose` as dependencies.
2. Built `server.js` with:
   - In-memory `appointments` array and `doctors` list with time slots.
   - `GET /api/doctors` — returns all doctors with their available time slots.
   - `GET /api/appointments` — returns all current appointments.
   - `POST /api/appointments` — creates a new appointment with a UUID.
   - `PUT /api/appointments/:id/status` — updates appointment status.
   - `DELETE /api/appointments/:id` — cancels an appointment.
   - Optional MongoDB connection block (commented out).
3. Built `public/index.html` with:
   - Two-panel layout: booking form (left) + appointments table (right).
   - Doctor dropdown populated from API; selecting a doctor updates the time slot dropdown.
   - Booking form POSTs to the server; table refreshes on success.
   - Delete button calls DELETE endpoint and refreshes the table.

## Running Locally
```bash
cd source-code
npm install
npm start
# Visit http://localhost:3001
```

## Output Description
A green-themed appointment booking dashboard:
- Header with "MedBook" branding
- Left panel: booking form with patient name, email, phone, doctor dropdown, time slot, date, and reason
- Right panel: live appointment table with status badges (Confirmed/Pending) and delete action
- Success alert appears after booking with appointment ID

## Output Screenshots
> Add screenshots of this running locally here.
