const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./contacts.db');

// Get all contacts
router.get('/', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new contact
router.post('/', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run('INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, phone, address });
  });
});

// Update a contact
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  db.run('UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, email, phone, address, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, name, email, phone, address });
  });
});

// Delete a contact
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM contacts WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

module.exports = router;
