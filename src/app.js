import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';
import authRoutes from './routes/auth.routes.js';
import { verifyToken } from './middleware/authMiddleware.js';

const app = express();

// Para obtener el directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};
app.use(cors());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de autenticación (no requieren token)
app.use('/api/auth', authRoutes);

// Rutas protegidas con JWT
app.use('/api', verifyToken, clientesRoutes);
app.use('/api', verifyToken, productosRoutes);

// Endpoint no encontrado
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
