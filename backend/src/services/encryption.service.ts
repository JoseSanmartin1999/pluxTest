import crypto from 'crypto';

export class EncryptionService {
  /**
   * Genera una llave simétrica randómica de 32 caracteres [cite: 71]
   */
  static generateSimetricKey(): string {
    return crypto.randomBytes(16).toString('hex'); // 32 caracteres hexadecimales
  }

  /**
   * Cifrado AES-256-ECB para datos de tarjeta [cite: 72, 78]
   */
  static encryptAES(text: string, simetricKey: string): string {
    const key = Buffer.from(simetricKey);
    const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  /**
   * Cifrado RSA para la llave simétrica usando la llave pública de Plux [cite: 97, 100]
   */
  static encryptRSA(simetricKey: string, publicKey: string): string {
    const buffer = Buffer.from(simetricKey);
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING, // Requerido por Plux [cite: 113]
      },
      buffer
    );
    return encrypted.toString('base64');
  }
}