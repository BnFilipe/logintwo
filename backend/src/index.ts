import express from 'express';
import cors from 'cors'; // Importa o middleware cors
import loginRoutes from './routes/loginRoutes';
import registerRoutes from './routes/registerRoutes';

const app = express();

// Configura o middleware cors
app.use(cors());

// Configura o middleware para interpretar JSON
app.use(express.json());

// Define as rotas
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// Inicia o servidor
app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});

export default app;

