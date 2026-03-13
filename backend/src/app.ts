import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pluxWebhook } from './controllers/webhook.controller';
import { processPayment } from './controllers/payment.controller';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Ruta para que Xavier envíe el pago
app.post('/api/pago', processPayment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend de pluxTest corriendo en puerto ${PORT}`);
});

app.post('/api/webhook-plux', pluxWebhook);

// Ruta de consulta para Xavier (opcional: Bryan puede usarla para ver logs)
app.get('/api/pago/status/:id', (req, res) => {
    // Lógica para consultar el estado en tu DB
});