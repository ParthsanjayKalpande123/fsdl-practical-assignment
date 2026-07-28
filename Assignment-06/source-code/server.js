// Assignment 06 — Appointment Booking App
// Node.js + Express + in-memory data (optional MongoDB included)

const express = require('express');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');
const app  = express();
const PORT = process.env.PORT || 3001;

// ---- Optional MongoDB ----
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appointments')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.warn('⚠️  Using in-memory store.\n', err.message));
//
// const appointmentSchema = new mongoose.Schema({
//   id: String, patientName: String, email: String, phone: String,
//   doctor: String, department: String, date: String, time: String,
//   reason: String, status: String, createdAt: Date,
// });
// const Appointment = mongoose.model('Appointment', appointmentSchema);

// ---- In-Memory Store ----
let appointments = [
  { id: uuidv4(), patientName: 'Amit Sharma',  email: 'amit@email.com',  phone: '9876543210', doctor: 'Dr. Priya Nair',   department: 'Cardiology',   date: '2024-08-05', time: '10:00', reason: 'Chest pain follow-up', status: 'Confirmed',  createdAt: new Date() },
  { id: uuidv4(), patientName: 'Riya Patel',   email: 'riya@email.com',  phone: '9012345678', doctor: 'Dr. Rahul Mehta',  department: 'Orthopedics',  date: '2024-08-06', time: '11:30', reason: 'Knee pain',            status: 'Pending',    createdAt: new Date() },
  { id: uuidv4(), patientName: 'Siddharth K.', email: 'sid@email.com',   phone: '8765432109', doctor: 'Dr. Sunita Joshi', department: 'Dermatology',  date: '2024-08-07', time: '14:00', reason: 'Skin allergy',         status: 'Confirmed',  createdAt: new Date() },
];

const doctors = [
  { id: 1, name: 'Dr. Priya Nair',    department: 'Cardiology',    slots: ['09:00','10:00','11:00','14:00','15:00'] },
  { id: 2, name: 'Dr. Rahul Mehta',   department: 'Orthopedics',   slots: ['10:00','11:30','13:00','15:00','16:00'] },
  { id: 3, name: 'Dr. Sunita Joshi',  department: 'Dermatology',   slots: ['09:30','11:00','14:00','15:30'] },
  { id: 4, name: 'Dr. Ankit Desai',   department: 'Neurology',     slots: ['10:00','12:00','14:00','16:00'] },
  { id: 5, name: 'Dr. Meena Kulkarni',department: 'Pediatrics',    slots: ['09:00','10:30','12:00','14:30'] },
];

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----
app.get('/api/doctors', (req, res) => res.json(doctors));

app.get('/api/appointments', (req, res) => res.json(appointments));

app.post('/api/appointments', (req, res) => {
  const { patientName, email, phone, doctor, department, date, time, reason } = req.body;
  if (!patientName || !email || !date || !time || !doctor) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }
  const newApp = { id: uuidv4(), patientName, email, phone, doctor, department, date, time, reason, status: 'Pending', createdAt: new Date() };
  appointments.push(newApp);
  console.log(`📅 New appointment: ${patientName} with ${doctor} on ${date} at ${time}`);
  res.status(201).json({ success: true, appointment: newApp });
});

app.put('/api/appointments/:id/status', (req, res) => {
  const appt = appointments.find(a => a.id === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found.' });
  appt.status = req.body.status || 'Confirmed';
  res.json({ success: true, appointment: appt });
});

app.delete('/api/appointments/:id', (req, res) => {
  const before = appointments.length;
  appointments = appointments.filter(a => a.id !== req.params.id);
  if (appointments.length === before) return res.status(404).json({ error: 'Not found.' });
  res.json({ success: true });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`🏥 Appointment booking app at http://localhost:${PORT}`));
