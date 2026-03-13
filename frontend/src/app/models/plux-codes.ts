export enum PluxResponseCode {
    SUCCESS = 0,                         // Pago realizado correctamente 
    CREDENTIALS_ERROR = 1,               // Credenciales incorrectas 
    BANK_REJECTED = 2,                   // Rechazo del banco (ej: Tarjeta bloqueada) 
    OTP_GENERATED = 100,                 // Otp Generado correctamente 
    OTP_INCORRECT = 102,                 // Código Otp incorrecto 
    PENDING_3DS = 103,                   // Pendiente por aprobación 3DS 
    NO_PLANS = 301,                      // El establecimiento no registra planes 
    ESTABLISHMENT_NOT_FOUND = 302,       // El establecimiento no existe 
    PLAN_DATA_INCORRECT = 303,           // Datos de consulta de plan incorrectos 
    LIMITS_EXCEEDED = 304                // Montos o cantidades diarias/mensuales superadas 
}

export interface PluxResponse {
    code: PluxResponseCode;
    description: string;
    status: 'Success' | 'Failed' | 'succeeded' | 'failed'; // Plux varía el casing según el endpoint [cite: 405, 420, 716]
    detail?: any;
}