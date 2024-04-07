import express, { json } from 'express';
import 'dotenv/config'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccountKey from './../mern-blog-website-677c6-firebase-adminsdk-92llk-a33ccf8340.json' assert {type: "json"};

// rest object 
const server = express();
let PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
})
server.use(express.json())
server.use(cors())

// db connection
connectDB();

// routes 
server.use('/', authRoutes);

server.listen(PORT, () => {
    console.log('Listening on port ->', PORT);
})