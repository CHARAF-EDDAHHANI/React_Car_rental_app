
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import carRoutes from './routes/carRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/images', express.static(path.join(__dirname, 'engine', 'uploadedImages'))); // Serve uploaded images statically

// Routes
app.use('/api', carRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);
app.get('/', (req, res) => {  // handle default route
  res.send('API is running...');
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
