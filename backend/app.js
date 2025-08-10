import express from 'express';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import connectDB from './config/database.js';
import cors from 'cors';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

connectDB();

app.use(express.json());

app.use('/api/user', userRoute);

app.get('/', (req, res)=> {
 res.send("This is testing route");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})