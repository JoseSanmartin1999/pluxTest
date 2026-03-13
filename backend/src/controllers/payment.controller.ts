import { Request, Response } from 'express';
import axios from 'axios';
import { EncryptionService } from '../services/encryption.service';

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { 
      card, buyer, baseAmount0, baseAmount12, currency, description, installments, interests, idEstablecimiento, clientIp 
    } = req.body;

    const simetricKey = EncryptionService.generateSimetricKey();

    // 1. Cifrado de datos sensibles [cite: 72, 73, 74]
    const encryptedCard = {
      number: EncryptionService.encryptAES(card.number, simetricKey),
      expirationYear: EncryptionService.encryptAES(card.expirationYear, simetricKey),
      expirationMonth: EncryptionService.encryptAES(card.expirationMonth, simetricKey),
      cvv: EncryptionService.encryptAES(card.cvv, simetricKey),
    };

    // 2. Cifrado RSA [cite: 98, 152]
    const rsaSimetricKey = EncryptionService.encryptRSA(simetricKey, process.env.PLUX_PUBLIC_KEY!);

    // 3. Credenciales Auth exactas usando nombres correctos de .env
    const plainAuth = `${process.env.PLUX_ID_CLIENTE?.trim()}:${process.env.PLUX_CLAVE_SECRETA?.trim()}`;
    const authHeader = `Basic ${Buffer.from(plainAuth).toString('base64')}`;

    // 4. Construcción del cuerpo
    const pluxPayload = {
      card: encryptedCard,
      buyer: {
        documentNumber: buyer.documentNumber, // Sin guiones
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        phone: buyer.phone,
        email: buyer.email,
        shippingAddress: buyer.shippingAddress
      },
      currency: currency || 'USD',
      // Convertidos explícitamente a Number para cumplir con el JSON esperado 
      baseAmount: Number(parseFloat(baseAmount0).toFixed(2)), 
      baseAmount12: Number(parseFloat(baseAmount12).toFixed(2)), 
      installments: installments || '0', 
      interests: interests || '0',
      description: description.substring(0, 250), 
      clientIp: clientIp || req.ip,
      // Asumimos que el frontend (Xavier) envía "1008" en texto plano
      idEstablecimiento: Buffer.from(idEstablecimiento.toString()).toString('base64') 
    };

    const response = await axios.post(
      `${process.env.PLUX_BASE_URL}credentials/paymentCardResource`, 
      pluxPayload, 
      {
        headers: {
          'Authorization': authHeader,
          'simetricKey': rsaSimetricKey,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    const errorDetail = error.response?.data || error.message;
    console.error("Error Plux:", errorDetail);
    res.status(500).json({ error: "Falla en el procesamiento", detail: errorDetail });
  }
};