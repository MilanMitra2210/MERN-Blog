import express from 'express';
import 'dotenv/config'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// rest object 
const server = express();
let PORT = 3000;

server.use(express.json())

// db connection
connectDB();

// routes 
server.use('/', authRoutes);

server.listen(PORT, ()=>{
    console.log('Listening on port ->', PORT);
})