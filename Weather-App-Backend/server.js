const express = require('express');
const colors = require('colors');
const cors = require('cors')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const weatherRoutes = require('./backend/routes/weatherRoutes')
const userRoutes = require('./backend/routes/userRoutes')
const connectDB = require('./backend/config/db')
const session = require('express-session');

connectDB();
const app = express();

// Session middleware
app.use(session({
    secret: "contour",
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/api/weather',weatherRoutes)
app.use('/api/user',userRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`));