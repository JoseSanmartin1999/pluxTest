# pluxTest - Integración PagoPlux

Este proyecto contiene una integración con la pasarela de pagos PagoPlux, dividida en un backend (Node.js/Express) y un frontend (Angular).

## Estructura del Proyecto

- `/backend`: Servidor Express encargado de la lógica de cifrado (AES-256/RSA) y comunicación con la API de PagoPlux.
- `/frontend`: Aplicación cliente que consume el backend.

---

## Backend (Configuración e Inicio)

El backend es el encargado de procesar los datos sensibles de la tarjeta y realizar el pago de forma segura.

### Requisitos
- Node.js
- npm

### Instalación
1. Entra a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Configuración (Variables de Entorno)
Asegúrate de tener un archivo `.env` en la raíz de la carpeta `/backend` con el siguiente formato:

```env
PORT=3000
PLUX_API_URL=https://apipre.pagoplux.com/intv1/
PLUX_CLIENT_ID=TU_CLIENT_ID
PLUX_SECRET_KEY=TU_SECRET_KEY
PLUX_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nCONTENIDO_DE_LA_LLAVE\n-----END PUBLIC KEY-----"
```

### Iniciar el servidor
```bash
npm run dev
```
El servidor correrá en `http://localhost:3000`.

---

## API para el Frontend

### Procesar Pago
**Endpoint:** `POST /api/pago`

**Cuerpo de la petición (JSON):**
El frontend debe enviar los datos de la tarjeta y del comprador. El backend se encarga de cifrar la tarjeta internamente.

```json
{
  "card": {
    "number": "4540639936908783",
    "expirationYear": "2029",
    "expirationMonth": "04",
    "cvv": "123"
  },
  "buyer": {
    "documentNumber": "1710020012",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0964282244",
    "email": "john.doe@test.com",
    "shippingAddress": {
      "country": "Ecuador",
      "city": "Quito",
      "street": "Av. Amazonas",
      "number": "N44"
    }
  },
  "currency": "USD",
  "baseAmount0": 0.00,
  "baseAmount12": 10.00,
  "installments": "0",
  "interests": "0",
  "description": "Descripción del pago",
  "idEstablecimiento": "1008",
  "clientIp": "127.0.0.1"
}
```

**Nota para el desarrollador Frontend:**
- `idEstablecimiento`: Envía el número puro (ej: "1008"). El backend lo convertirá a Base64 automáticamente.
- `encryption`: El frontend **no necesita** cifrar nada. Envía los datos de la tarjeta en texto plano a tu backend local, y el backend hará el cifrado AES-256 antes de enviarlo a PagoPlux.

---

## Frontend (Configuración e Inicio)

### Requisitos
- Angular CLI (si se usa `ng serve`)
- npm

### Instalación
1. Entra a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Iniciar Aplicación
```bash
npm start
# o
ng serve
```

---

## Pruebas Sandbox

Utiliza las tarjetas de prueba oficiales de PagoPlux para el entorno de Sandbox. Por ejemplo:
- **VISA (Exitosa):** 4540639936908783, exp: 04/2029, cvv: 123.