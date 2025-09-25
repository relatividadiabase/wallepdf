# Wallet Cambios API

API para generar facturas PDF de Wallet Cambios usando Node.js, Express y Puppeteer.

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

### 3. Ejecutar en producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 📋 Endpoints Disponibles

### `POST /api/generate-invoice`
Genera una factura en formato PDF.

**Body de ejemplo:**
```json
{
  "companyInfo": {
    "name": "WALLET CAMBIOS",
    "website": "www.walletcambios.com",
    "email": "soporte@walletcambios.com",
    "phone": "+57 300 000 0000"
  },
  "invoiceInfo": {
    "invoiceNumber": "FAC-070",
    "date": "20/09/2025",
    "transactionNumber": "70"
  },
  "clientInfo": {
    "senderName": "Sthefany Guevara",
    "document": "13014361"
  },
  "transactions": [
    {
      "originCountry": "Venezuela",
      "destinationBank": "Banesco",
      "recipient": "María Peres",
      "reference": "00025826",
      "amountSent": "12,200",
      "usdEquivalent": "30"
    }
  ],
  "totals": {
    "totalPayments": 1,
    "totalDeclaredAmount": "30 USD"
  }
}
```

**Respuesta:** Archivo PDF para descargar

### `GET /api/example-data`
Obtiene datos de ejemplo para generar una factura.

### `GET /health`
Verifica que el servidor esté funcionando.

### `GET /api/docs`
Documentación simple de la API.

## 🧪 Prueba Rápida

### Con curl:
```bash
curl -X POST http://localhost:3000/api/generate-invoice \
  -H "Content-Type: application/json" \
  -d @test-data.json \
  --output factura.pdf
```

### Con Postman:
1. POST a `http://localhost:3000/api/generate-invoice`
2. Body: Raw JSON con los datos de la factura
3. El PDF se descargará automáticamente

## 🏗️ Estructura del Proyecto

```
src/
├── app.js              # Aplicación principal
├── routes/
│   └── invoiceRoutes.js    # Rutas de la API
├── services/
│   └── pdfService.js       # Servicio de generación PDF
├── validators/
│   └── invoiceValidator.js # Validación de datos
└── templates/
    └── invoice.hbs         # Template HTML de la factura
```

## 🔧 Tecnologías Utilizadas

- **Express.js**: Framework web
- **Puppeteer**: Generación de PDFs desde HTML
- **Handlebars**: Templates dinámicos
- **Joi**: Validación de datos
- **Helmet**: Seguridad HTTP
- **CORS**: Cross-Origin Resource Sharing

## 🐳 Docker (Opcional)

Si quieres usar Docker, puedes crear un `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Notas Importantes

- Los PDFs se generan usando Puppeteer con renderizado HTML/CSS
- La validación de datos es estricta usando Joi
- El diseño replica exactamente la factura original
- Todos los endpoints incluyen manejo de errores robusto
- La API es stateless y puede escalarse horizontalmente
