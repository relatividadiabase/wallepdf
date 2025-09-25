const express = require('express');
const { generateInvoicePDF } = require('../services/pdfService');
const { validateInvoiceData } = require('../validators/invoiceValidator');

const router = express.Router();

// Endpoint principal para generar factura PDF
router.post('/generate-invoice', async (req, res) => {
  try {
    // Validar datos de entrada
    const { error, value } = validateInvoiceData(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: error.details.map(detail => detail.message)
      });
    }

    // Generar PDF
    const pdfBuffer = await generateInvoicePDF(value);

    // Configurar headers para descarga
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="factura-${value.invoiceNumber}.pdf"`,
      'Content-Length': pdfBuffer.length
    });

    // Enviar PDF
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generando factura:', error);
    res.status(500).json({
      error: 'Error generando la factura',
      message: error.message
    });
  }
});

// Endpoint para obtener ejemplo de datos
router.get('/example-data', (req, res) => {
  res.json({
    message: 'Ejemplo de datos para generar factura',
    example: {
      companyInfo: {
        name: "WALLET CAMBIOS",
        website: "www.walletcambios.com",
        email: "soporte@walletcambios.com",
        phone: "+57 300 000 0000"
      },
      invoiceInfo: {
        invoiceNumber: "FAC-070",
        date: "20/09/2025",
        transactionNumber: "70"
      },
      clientInfo: {
        senderName: "Sthefany Guevara",
        document: "13014361"
      },
      transactions: [
        {
          originCountry: "Venezuela",
          destinationBank: "Banesco",
          recipient: "María Peres",
          reference: "00025826",
          amountSent: "12,200",
          usdEquivalent: "30"
        },
        {
          originCountry: "Colombia",
          destinationBank: "Bancolombia",
          recipient: "Angel Pérez",
          reference: "552255",
          amountSent: "60,000",
          usdEquivalent: "20"
        }
      ],
      totals: {
        totalPayments: 2,
        totalDeclaredAmount: "50 USD"
      }
    }
  });
});

// Endpoint de documentación simple
router.get('/docs', (req, res) => {
  res.json({
    title: 'Wallet Cambios API',
    description: 'API para generar facturas PDF',
    endpoints: {
      'POST /api/generate-invoice': {
        description: 'Genera una factura en PDF',
        body: 'Ver /api/example-data para estructura'
      },
      'GET /api/example-data': {
        description: 'Obtiene ejemplo de datos válidos'
      },
      'GET /health': {
        description: 'Verifica el estado del servidor'
      }
    }
  });
});

module.exports = router;
