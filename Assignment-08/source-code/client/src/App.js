// Assignment 08 — TaskFlow: MERN Task Manager — React App.js

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const API = '';  // proxy to localhost:5001

const STATUS_FLOW = { 'Todo': 'In Progress', 'In Progress': 'Done', 'Done': 'Todo' };
const COLUMNS     = ['Todo', 'In Progress', 'Done'];
const COL_COLORS  = { 'Todo': '#60a5fa', 'In Progress': '#fbbf24', 'Done': '#34d399' };

const initForm = { title: '', description: '', priority: 'Medium', dueDate: '' };

export default function App() {
  const [tasks, setTasks]   = useState([]);
  const [stats, setStats]   = useState({ total: 0, Todo: 0, 'In Progress': 0, Done: 0 });
  const [form, setForm]     = useState(initForm);
  const [editId, setEditId] = useState(null);

  const fetchTasks = useCallback(async () => {
    const res = await fetch(`${API}/api/tasks`);
    setTasks(await res.json());
  }, []);

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${API}/api/tasks/stats`);
    setStats(await res.json());
  }, []);

  useEffect(() => { fetchTasks(); fetchStats(); }, [fetchTasks, fetchStats]);

  const refresh = () => { fetchTasks(); fetchStats(); };

  // Create or Update
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Title is required');
    if (editId) {
      await fetch(`${API}/api/tasks/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditId(null);
    } else {
      await fetch(`${API}/api/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm(initForm);
    refresh();
  };

  // Advance status
  const advanceStatus = async task => {
    const next = STATUS_FLOW[task.status];
    await fetch(`${API}/api/tasks/${task._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) });
    refresh();
  };

  // Delete
  const deleteTask = async id => {
    if (!window.confirm('Delete this task?')) return;
    await fetch(`${API}/api/tasks/${id}`, { method: 'DELETE' });
    refresh();
  };

  // Start edit
  const startEdit = task => {
    setForm({ title: task.title, description: task.description, priority: task.priority, dueDate: task.dueDate });
    setEditId(task._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tasksByStatus = status => tasks.filter(t => t.status === status);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div>
          <h1>📋 TaskFlow</h1>
          <p>Assignment 08 — MERN Full-Stack Mini Project</p>
        </div>
        <div className="db-badge">React + Express + MongoDB</div>
      </header>

      <div className="container">

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box"><div className="num num-purple">{stats.total}</div><div className="lbl">Total Tasks</div></div>
          <div className="stat-box"><div className="num num-blue">{stats['Todo']}</div><div className="lbl">Todo</div></div>
          <div className="stat-box"><div className="num num-yellow">{stats['In Progress']}</div><div className="lbl">In Progress</div></div>
          <div className="stat-box"><div className="num num-green">{stats['Done']}</div><div className="lbl">Done</div></div>
        </div>

        {/* Add / Edit Form */}
        <div className="add-form">
          <h2>{editId ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Task title…" required />
              </div>
              <div className="form-field">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div className="form-field">
                <label>Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Description</label>
                <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Optional…" />
              </div>
              <button className="btn-add" type="submit">{editId ? 'Update' : 'Add Task'}</button>
            </div>
          </form>
        </div>

        {/* Kanban Board */}
        <div className="board">
          {COLUMNS.map(col => (
            <div className="column" key={col}>
              <div className="col-header">
                <span className="col-title" style={{ color: COL_COLORS[col] }}>● {col}</span>
                <span className="col-count">{tasksByStatus(col).length}</span>
              </div>
              {tasksByStatus(col).length === 0
                ? <p className="empty-col">No tasks here</p>
                : tasksByStatus(col).map(task => (
                  <div className="task-card" key={task._id}>
                    <p className="task-title">{task.title}</p>
                    {task.description && <p className="task-desc">{task.description}</p>}
                    <div className="task-footer">
                      <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                      {task.dueDate && <span className="due-date">📅 {task.dueDate}</span>}
                      <div className="task-actions">
                        <button className="btn-status" onClick={() => advanceStatus(task)} title={`Move to ${STATUS_FLOW[task.status]}`}>
                          → {STATUS_FLOW[task.status]}
                        </button>
                        <button className="btn-status" style={{ background: '#374151' }} onClick={() => startEdit(task)}>✏️</button>
                        <button className="btn-delete" onClick={() => deleteTask(task._id)}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
