// Assignment 05 — College Information Site
// Node.js + Express with in-memory data (optional MongoDB connection included)

const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

// ---- Optional MongoDB Connection ----
// Uncomment the block below and set MONGO_URI in your environment to enable DB.
//
// const mongoose = require('mongoose');
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college_site';
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.warn('⚠️  MongoDB not connected — using in-memory data.\n', err.message));

// ---- In-Memory Data ----
const collegeInfo = {
  name: 'Vishwakarma Institute of Technology',
  location: 'Pune, Maharashtra, India',
  founded: 2002,
  departments: [
    { id: 1, name: 'Computer Engineering',      hod: 'Dr. A. Sharma',  students: 480 },
    { id: 2, name: 'Electronics Engineering',    hod: 'Dr. P. Joshi',   students: 360 },
    { id: 3, name: 'Mechanical Engineering',     hod: 'Dr. R. Kulkarni',students: 300 },
    { id: 4, name: 'Civil Engineering',          hod: 'Dr. S. Patil',   students: 240 },
    { id: 5, name: 'Information Technology',     hod: 'Dr. M. Desai',   students: 360 },
  ],
  events: [
    { id: 1, title: 'TechFest 2024',       date: '2024-03-15', venue: 'Main Auditorium' },
    { id: 2, title: 'Sports Week',         date: '2024-04-05', venue: 'Sports Ground'   },
    { id: 3, title: 'Cultural Night',      date: '2024-02-20', venue: 'Open Air Stage'  },
    { id: 4, title: 'Placement Drive',     date: '2024-05-10', venue: 'Conference Hall' },
  ],
  contacts: {
    phone: '+91-20-XXXX-XXXX',
    email: 'info@vit.edu',
    website: 'https://www.vit.edu',
  },
};

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- API Routes ----
app.get('/api/college', (req, res) => {
  res.json({
    name: collegeInfo.name,
    location: collegeInfo.location,
    founded: collegeInfo.founded,
    contacts: collegeInfo.contacts,
  });
});

app.get('/api/departments', (req, res) => {
  res.json(collegeInfo.departments);
});

app.get('/api/events', (req, res) => {
  res.json(collegeInfo.events);
});

// Inquiry form submission (in-memory — logs to console; wire to DB if needed)
app.post('/api/inquiry', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  console.log(`📩 New Inquiry from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: `Thank you, ${name}! We'll get back to you at ${email}.` });
});

// Catch-all — serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🏫 College site running at http://localhost:${PORT}`);
});
