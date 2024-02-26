const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

function connectToMongoDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('Successfully Connected to MongoDB!!!'); })
        .catch((error) => { console.log('Error connecting to MongoDB', error); });
}

connectToMongoDB();


app.use('/api/auth', userRoutes);

app.use("/api/messages", messagesRoute);














app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
