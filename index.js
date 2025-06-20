const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const { register, login } = require('./controllers/authcontroller');
const { createNote, getNote, updateNote, deleteNote } = require('./controllers/notecontroller');
const authMiddleware = require('./middleware/auth');

app.use(cors());
app.use(express.json());

const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl).then(() => {
  console.log("DB connected successfully");
}).catch(err => {
  console.error("DB connection error:", err);
});

app.post('/api/register', register);
app.post('/api/login', login);

app.post('/api/notes', authMiddleware, createNote);
app.get('/api/notes', authMiddleware, getNote);
app.put('/api/notes/:id', authMiddleware, updateNote);
app.delete('/api/notes/:id', authMiddleware, deleteNote);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));