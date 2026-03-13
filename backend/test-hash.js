const crypto = require('crypto');
require('dotenv').config({ path: 'c:/Users/VICTUS/Documents/CV/Plux/pluxTest/backend/.env' });

const clientId = process.env.PLUX_CLIENT_ID?.trim();
const secretKey = process.env.PLUX_SECRET_KEY?.trim();
const plainAuth = `${clientId}:${secretKey}`;

const basicBase64 = Buffer.from(plainAuth).toString('base64');
const sha256Base64 = crypto.createHash('sha256').update(plainAuth).digest('base64');

console.log("Plain Auth:", plainAuth);
console.log("Basic Base64:", basicBase64);
console.log("SHA256 Base64:", sha256Base64);
