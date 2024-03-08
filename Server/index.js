const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');
const socket = require('socket.io');
const path = require('path');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

function connectToMongoDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('Successfully Connected to MongoDB!!!'); })
        .catch((error) => { console.log('Error connecting to MongoDB', error); });
}

connectToMongoDB();


app.use('/api/auth', userRoutes);

app.use("/api/messages", messagesRoute);


// * --------->> Deployment Start <<-----------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname1, '/App/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'App', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

// * --------->> Deployment End <<-----------




// Implementing Sockets

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('message-send', (message) => {
        const { from, to, text } = message;
        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
            socket.to(toSocketId).emit('message-recieve', { text, from });
        }
    });
});

