const Joi = require('joi');

// Schema para validar transacciones individuales
const transactionSchema = Joi.object({
  originCountry: Joi.string().required().messages({
    'any.required': 'País de origen es requerido',
    'string.empty': 'País de origen no puede estar vacío'
  }),
  destinationBank: Joi.string().required().messages({
    'any.required': 'Banco destino es requerido',
    'string.empty': 'Banco destino no puede estar vacío'
  }),
  recipient: Joi.string().required().messages({
    'any.required': 'Destinatario es requerido',
    'string.empty': 'Destinatario no puede estar vacío'
  }),
  reference: Joi.string().required().messages({
    'any.required': 'Referencia es requerida',
    'string.empty': 'Referencia no puede estar vacía'
  }),
  amountSent: Joi.string().required().messages({
    'any.required': 'Monto enviado es requerido',
    'string.empty': 'Monto enviado no puede estar vacío'
  }),
  usdEquivalent: Joi.string().required().messages({
    'any.required': 'Equivalente USD es requerido',
    'string.empty': 'Equivalente USD no puede estar vacío'
  })
});

// Schema principal para validar toda la factura
const invoiceSchema = Joi.object({
  companyInfo: Joi.object({
    name: Joi.string().default("WALLET CAMBIOS"),
    website: Joi.string().default("www.walletcambios.com"),
    email: Joi.string().email().default("soporte@walletcambios.com"),
    phone: Joi.string().default("+57 300 000 0000")
  }).default(),
  
  invoiceInfo: Joi.object({
    invoiceNumber: Joi.string().required().messages({
      'any.required': 'Número de factura es requerido',
      'string.empty': 'Número de factura no puede estar vacío'
    }),
    date: Joi.string().required().messages({
      'any.required': 'Fecha es requerida',
      'string.empty': 'Fecha no puede estar vacía'
    }),
    transactionNumber: Joi.string().required().messages({
      'any.required': 'Número de transacción es requerido',
      'string.empty': 'Número de transacción no puede estar vacío'
    })
  }).required(),
  
  clientInfo: Joi.object({
    senderName: Joi.string().required().messages({
      'any.required': 'Nombre del remitente es requerido',
      'string.empty': 'Nombre del remitente no puede estar vacío'
    }),
    document: Joi.string().required().messages({
      'any.required': 'Documento es requerido',
      'string.empty': 'Documento no puede estar vacío'
    })
  }).required(),
  
  transactions: Joi.array().items(transactionSchema).min(1).required().messages({
    'array.min': 'Debe haber al menos una transacción',
    'any.required': 'Las transacciones son requeridas'
  }),
  
  totals: Joi.object({
    totalPayments: Joi.number().integer().min(1).required().messages({
      'any.required': 'Total de pagos es requerido',
      'number.min': 'Total de pagos debe ser al menos 1'
    }),
    totalDeclaredAmount: Joi.string().required().messages({
      'any.required': 'Monto total declarado es requerido',
      'string.empty': 'Monto total declarado no puede estar vacío'
    })
  }).required()
});

// Función para validar los datos de la factura
function validateInvoiceData(data) {
  return invoiceSchema.validate(data, { 
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
}

module.exports = {
  validateInvoiceData,
  invoiceSchema
};
