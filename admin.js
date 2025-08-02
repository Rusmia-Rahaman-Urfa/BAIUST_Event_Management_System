const express = require('express');
const router = express.Router();
const db = require('../db');

// Get student-wise event registrations
router.get('/events-registrations', (req, res) => {
  const query = `
    SELECT s.StudentID, s.Name, s.Department, s.Email,
           e.EventName, e.EventDate, e.Location,
           r.RegDate, r.Role, r.Others
    FROM registration r
    JOIN student s ON r.StudentID = s.StudentID
    JOIN event e ON r.EventID = e.EventID
    ORDER BY e.EventDate DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching registrations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get upcoming events with coordinator info
router.get('/upcoming-events-registrations', (req, res) => {
  const query = `
    SELECT e.EventName, e.EventDate, e.Location,
           c.name AS CoordinatorName, c.email AS CoordinatorEmail
    FROM event e
    LEFT JOIN coordinator c ON e.CoordinatorID = c.coordinatorId
    WHERE e.EventDate >= CURDATE()
    ORDER BY e.EventDate ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching upcoming events:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get total unique students registered count
router.get('/total-students', (req, res) => {
  const query = `SELECT COUNT(DISTINCT StudentID) AS count FROM registration`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total students:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0]);
  });
});

module.exports = router;
