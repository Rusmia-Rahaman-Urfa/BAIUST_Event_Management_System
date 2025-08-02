
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        e.EventID, e.EventName, e.EventDate, e.Location,
        c.name as CoordinatorName
      FROM event e
      LEFT JOIN coordinator c ON e.CoordinatorID = c.coordinatorId
      ORDER BY e.EventDate ASC
    `;
    const [events] = await db.promise().query(sql);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
