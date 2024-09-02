import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.mjs';
import cuentaRoutes from './routes/cuentaRoutes.mjs';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api', cuentaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running');
});
