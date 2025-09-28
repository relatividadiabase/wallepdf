# Ejemplos de Curl para Wallet Cambios API con Logo

## 🎯 Comando Básico con Logo

```bash
curl -X POST http://localhost:3000/api/generate-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "companyInfo": {
      "name": "WALLET CAMBIOS",
      "website": "www.walletcambios.com",
      "email": "soporte@walletcambios.com",
      "phone": "+57 300 000 0000"
    },
    "invoiceInfo": {
      "invoiceNumber": "FAC-001",
      "date": "26/09/2025",
      "transactionNumber": "100"
    },
    "clientInfo": {
      "senderName": "Juan Pérez",
      "document": "12345678"
    },
    "transactions": [
      {
        "originCountry": "Venezuela",
        "destinationBank": "Banesco",
        "recipient": "María González",
        "reference": "123456",
        "amountSent": "50,000",
        "usdEquivalent": "15"
      }
    ],
    "totals": {
      "totalPayments": 1,
      "totalDeclaredAmount": "15 USD"
    },
    "logoPath": "./assets/images/logo2.svg"
  }' \
  --output mi-factura-con-logo.pdf
```

## 📁 Usando Archivo JSON

```bash
curl -X POST http://localhost:3000/api/generate-invoice \
  -H "Content-Type: application/json" \
  -d @test-data.json \
  --output factura-desde-archivo.pdf
```

## 🔧 Con Logo Personalizado (PNG/JPG)

```bash
curl -X POST http://localhost:3000/api/generate-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "companyInfo": {
      "name": "WALLET CAMBIOS",
      "website": "www.walletcambios.com",
      "email": "soporte@walletcambios.com",
      "phone": "+57 300 000 0000"
    },
    "invoiceInfo": {
      "invoiceNumber": "FAC-002",
      "date": "26/09/2025",
      "transactionNumber": "101"
    },
    "clientInfo": {
      "senderName": "Carlos López",
      "document": "87654321"
    },
    "transactions": [
      {
        "originCountry": "Colombia",
        "destinationBank": "Bancolombia",
        "recipient": "Ana García",
        "reference": "789012",
        "amountSent": "75,000",
        "usdEquivalent": "20"
      }
    ],
    "totals": {
      "totalPayments": 1,
      "totalDeclaredAmount": "20 USD"
    },
    "logoPath": "./assets/images/mi-logo-personalizado.png"
  }' \
  --output factura-logo-personalizado.pdf
```

## 📋 Sin Logo (Opcional)

```bash
curl -X POST http://localhost:3000/api/generate-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "companyInfo": {
      "name": "WALLET CAMBIOS",
      "website": "www.walletcambios.com",
      "email": "soporte@walletcambios.com",
      "phone": "+57 300 000 0000"
    },
    "invoiceInfo": {
      "invoiceNumber": "FAC-003",
      "date": "26/09/2025",
      "transactionNumber": "102"
    },
    "clientInfo": {
      "senderName": "Laura Martínez",
      "document": "11223344"
    },
    "transactions": [
      {
        "originCountry": "Perú",
        "destinationBank": "BCP",
        "recipient": "Roberto Silva",
        "reference": "345678",
        "amountSent": "100,000",
        "usdEquivalent": "27"
      }
    ],
    "totals": {
      "totalPayments": 1,
      "totalDeclaredAmount": "27 USD"
    }
  }' \
  --output factura-sin-logo.pdf
```

## 🎨 Formatos de Logo Soportados

- **SVG**: `logoPath: "./assets/images/logo.svg"`
- **PNG**: `logoPath: "./assets/images/logo.png"`
- **JPG/JPEG**: `logoPath: "./assets/images/logo.jpg"`
- **GIF**: `logoPath: "./assets/images/logo.gif"`

## 📝 Notas Importantes

1. **Ruta del logo**: Debe ser relativa al directorio del proyecto
2. **Sin logo**: Si no incluyes `logoPath`, la factura se generará sin logo
3. **Tamaño**: El logo se ajusta automáticamente a 80x50px
4. **Base64**: El logo se convierte automáticamente a base64 para el PDF

## 🔍 Verificar Resultado

```bash
# Verificar que el PDF se generó
ls -la *.pdf

# Obtener datos de ejemplo
curl -X GET http://localhost:3000/api/example-data

# Verificar estado del servidor
curl -X GET http://localhost:3000/health
```

