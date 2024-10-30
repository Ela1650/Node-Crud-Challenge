const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const cors = require('cors'); 
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

let persons = [];

// Read - Get all persons
app.get('/persons', (req, res) => {
  res.json(persons);
});

// Read - Get a single person by ID
app.get('/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });
  res.json(person);
});

// Create - Add a new person
app.post('/persons', (req, res) => {
  const { name, age, hobbies } = req.body;

  // Validate required fields
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  if (age === undefined || typeof age !== 'number') {
    return res.status(400).json({ error: 'Age is required and must be a number.' });
  }
  if (!Array.isArray(hobbies)) {
    return res.status(400).json({ error: 'Hobbies must be an array of strings.' });
  }

  const newPerson = {
    id: uuidv4(), 
    name,
    age,
    hobbies: hobbies || [] 
  };
  persons.push(newPerson);
  res.status(201).json(newPerson);
});

// Update - Modify an existing person
app.put('/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });

  const { name, age, hobbies } = req.body;

  if (name !== undefined) person.name = name;
  if (age !== undefined) person.age = age;
  if (Array.isArray(hobbies)) person.hobbies = hobbies;

  res.json(person);
});

// Delete - Remove a person by ID
app.delete('/persons/:id', (req, res) => {
  const index = persons.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });

  const deletedPerson = persons.splice(index, 1);
  res.json(deletedPerson[0]);
});

// Handle non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Handle internal server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Run the server if this file is the entry point
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

module.exports = app;
