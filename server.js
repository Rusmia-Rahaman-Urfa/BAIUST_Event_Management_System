const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


const registrationRoutes = require('./routes/registration');
const eventsRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');

app.use('/register', registrationRoutes);
app.use('/events', eventsRoutes);
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('University Event Management Backend is running!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
