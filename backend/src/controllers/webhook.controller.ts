import { Request, Response } from 'express';
import { PluxResponseCode, PluxResponse } from '../models/plux-codes';

export const pluxWebhook = (req: Request, res: Response) => {
    const payload = req.body as PluxResponse;

    console.log(`[WEBHOOK] Procesando transacción: ${payload.description}`);

    switch (payload.code) {
        case PluxResponseCode.SUCCESS:
            // Lógica para cerrar la orden en tu base de datos
            break;
            
        case PluxResponseCode.BANK_REJECTED:
            console.error(`Transacción rechazada por el banco: ${payload.detail}`);
            break;

        case PluxResponseCode.OTP_INCORRECT:
            console.warn("El cliente falló la validación OTP.");
            break;

        case PluxResponseCode.LIMITS_EXCEEDED:
            console.error("El comercio ha superado sus límites diarios de transacciones.");
            break;
            
        default:
            console.log(`Notificación con código: ${payload.code}`);
    }

    res.status(200).send('OK');
};