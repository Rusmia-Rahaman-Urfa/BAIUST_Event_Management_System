const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { eventId, studentId, name, email, department, role, others } = req.body;

  try {
    const [eventRows] = await db.promise().query('SELECT * FROM event WHERE EventID = ?', [eventId]);
    if (eventRows.length === 0) {
      return res.status(400).send('<h2>Event not found. Please try again.</h2>');
    }


    const [students] = await db.promise().query('SELECT * FROM student WHERE StudentID = ?', [studentId]);

    if (students.length === 0) {
      await db.promise().query(
        'INSERT INTO student (StudentID, Name, Email, Department) VALUES (?, ?, ?, ?)',
        [studentId, name, email, department]
      );
    } else {
      await db.promise().query(
        'UPDATE student SET Name = ?, Email = ?, Department = ? WHERE StudentID = ?',
        [name, email, department, studentId]
      );
    }

    const regDate = new Date().toISOString().slice(0, 10);
    await db.promise().query(
      'INSERT INTO registration (EventID, StudentID, RegDate, Role, Others) VALUES (?, ?, ?, ?, ?)',
      [eventId, studentId, regDate, role || 'Participant', others || '']
    );

    res.send('<h2>Successfully registered! <a href="/events.html">Back to events</a></h2>');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('<h2>Server error. Please try again later.</h2>');
  }
});

module.exports = router;