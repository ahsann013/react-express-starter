import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import systemInfoRoutes from './routes/systemInfoRoutes.js';
const app = express();

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Define routes for user and authentication management
app.use('/uploads', express.static('uploads'));
const v1Router = express.Router();
v1Router.use('/auth', authRoutes);
v1Router.use('/system-info', systemInfoRoutes);


app.use('/api/v1', v1Router);


app.get('/api/v1/', (req, res) => {
    res.send({ "Hello": "World" })
})

export default app; // Use export default instead of module.exports