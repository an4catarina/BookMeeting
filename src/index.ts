import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();

app.use(express.json());

// Swagger
setupSwagger(app);

// Rotas da API
app.use('/api', routes);

// Rota base
app.get('/', (req, res) => {
  res.send('API rodando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Swagger em: http://localhost:${PORT}/api-docs`);
});
