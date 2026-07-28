// Assignment 08 — MERN Mini Project: Task Manager
// Express + Mongoose backend with in-memory fallback

const express  = require('express');
const cors     = require('cors');
const { v4: uuidv4 } = require('uuid');
const app  = express();
const PORT = process.env.PORT || 5001;

// ============================================================
// Optional MongoDB Connection + Mongoose Model
// ============================================================
let useDB = false;
let Task  = null;

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task_manager';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    useDB = true;
    const taskSchema = new mongoose.Schema({
      title:       { type: String, required: true },
      description: { type: String, default: '' },
      priority:    { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      status:      { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
      dueDate:     { type: String, default: '' },
    }, { timestamps: true });
    Task = mongoose.model('Task', taskSchema);
  })
  .catch(err => {
    console.warn('⚠️  MongoDB not connected — using in-memory store.\n', err.message);
  });

// ============================================================
// In-Memory Fallback Store
// ============================================================
let tasks = [
  { _id: uuidv4(), title: 'Set up MERN project structure', description: 'Create client and server folders', priority: 'High',   status: 'Done',        dueDate: '2024-08-01', createdAt: new Date() },
  { _id: uuidv4(), title: 'Build Express REST API',        description: 'CRUD routes for tasks',          priority: 'High',   status: 'Done',        dueDate: '2024-08-03', createdAt: new Date() },
  { _id: uuidv4(), title: 'Connect React frontend',        description: 'Fetch and display tasks',        priority: 'Medium', status: 'In Progress', dueDate: '2024-08-05', createdAt: new Date() },
  { _id: uuidv4(), title: 'Add MongoDB integration',       description: 'Replace in-memory with Mongoose', priority: 'Medium', status: 'Todo',       dueDate: '2024-08-07', createdAt: new Date() },
  { _id: uuidv4(), title: 'Deploy to GitHub Pages',        description: 'Enable docs/ for GitHub Pages', priority: 'Low',    status: 'Todo',        dueDate: '2024-08-10', createdAt: new Date() },
];

// ============================================================
// Middleware
// ============================================================
app.use(cors());
app.use(express.json());

// ============================================================
// Helper: use DB or in-memory
// ============================================================
async function getTasks()        { return useDB ? Task.find().sort({ createdAt: -1 }) : [...tasks].reverse(); }
async function createTask(data)  { if (useDB) return Task.create(data); const t = { _id: uuidv4(), ...data, createdAt: new Date() }; tasks.push(t); return t; }
async function updateTask(id, d) { if (useDB) return Task.findByIdAndUpdate(id, d, { new: true }); const t = tasks.find(x => x._id === id); if (!t) return null; Object.assign(t, d); return t; }
async function deleteTask(id)    { if (useDB) return Task.findByIdAndDelete(id); const i = tasks.findIndex(x => x._id === id); if (i === -1) return null; return tasks.splice(i, 1)[0]; }

// ============================================================
// Routes
// ============================================================
app.get('/api/tasks', async (req, res) => {
  try { res.json(await getTasks()); } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/tasks/stats', async (req, res) => {
  try {
    const all  = await getTasks();
    const stats = { total: all.length, Todo: 0, 'In Progress': 0, Done: 0 };
    all.forEach(t => { if (stats[t.status] !== undefined) stats[t.status]++; });
    res.json(stats);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required.' });
    const task = await createTask({ title, description: description || '', priority: priority || 'Medium', status: status || 'Todo', dueDate: dueDate || '' });
    res.status(201).json(task);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: 'Task not found.' });
    res.json(task);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await deleteTask(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found.' });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`🚀 Task Manager API at http://localhost:${PORT}`));
