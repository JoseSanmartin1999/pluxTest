const crypto = require('crypto')
const generado = k3RkZZ6YRsxHjxrX2qHcrA7zajaq5hWs //oficial

const CLAVE_PUBLICA_DASHBOARD_PPX = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzvKKjPxIOdSPZ40iqG95
nymZzStQLAAPqE/13wlnDxp9A+b4rUrTBKd2otqqeXest4MGX13uLjEnfxbGsR8Q
GUXdWaVp4W5faKTbaMOjkqgRjzEC8Kkfa5Aem1jI1zC4K7OJtuGbH6toskMsx3Kw
M1te2VDZJmlsEdZZ90z1rSooNiko+Cn59JsumvcPiz2FETKPtxCxHUzPd3n59ArW
IRM3CPML1JZjZAbsXigGDskdEjykKmZXM7FwMms7+1N2w81gWMtYlvAUJ3RGrpvz
xlsImSO0VSmZ2LGbrFrsfOpZfTrlBzLmA+HeYcNXN4Rcm7JqB4+uQxwTR4lb1E/e
RwIDAQAB
-----END PUBLIC KEY-----`;

function cifrarRSA (texto, publicKey) {
    let key = publicKey;
    if (key.indexOf('BEGIN PUBLIC KEY') < 0) {
        key = `-----BEGIN PUBLIC KEY-----\n${publicKey} \n-----END PUBLIC KEY-----`;
    }
    const encryptedData = crypto.publicEncrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        // We convert the data string to a buffer using Buffer.from
        Buffer.from(texto)
    );
    return encryptedData.toString("base64");
}
function cifrarAES_ECB (texto, claveSimetrica) {
    var key = Buffer.from(claveSimetrica);
    var src = Buffer.from(texto);
    var cipher = crypto.createCipheriv("AES-256-ECB", key, '');
    cipher.setAutoPadding(true);
    var result = cipher.update(src, 'utf8', 'base64');
    result += cipher.final('base64');
    return result;
}


let cifradorsa = cifrarRSA(generado, CLAVE_PUBLICA_DASHBOARD_PPX);
let cifradoaes_mes = cifrarAES_ECB("04", generado);
let cifradoaes_año = cifrarAES_ECB("29", generado);
let cifradoaes_cvv = cifrarAES_ECB("123", generado);
let cifrarAES_tarjeta = cifrarAES_ECB("4540639936908783",generado);

console.log("Clave Simetrica: ", cifradorsa)
console.log("cifradoaes_mes: ", cifradoaes_mes)
console.log("cifradoaes_año: ", cifradoaes_año)
console.log("cifradoaes_cvv: ", cifradoaes_cvv)
console.log("cifrarAES_tarjeta: ", cifrarAES_tarjeta)

console.log();