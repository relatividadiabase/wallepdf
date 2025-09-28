const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

// Función principal para generar PDF de factura
async function generateInvoicePDF(invoiceData) {
  let browser;
  
  try {
    // Lanzar navegador
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generar HTML desde template
    const html = await generateInvoiceHTML(invoiceData);
    
    // Configurar página
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Generar PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    return pdfBuffer;
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    throw new Error(`Error al generar PDF: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Función para generar HTML desde template
async function generateInvoiceHTML(data) {
  try {
    // Leer template HTML
    const templatePath = path.join(__dirname, '../templates/invoice.hbs');
    const templateSource = await fs.readFile(templatePath, 'utf8');
    
    // Cargar logo automáticamente desde assets/images/logo2.png
    let logoBase64 = null;
    try {
      // Ruta fija del logo
      const logoPath = path.join(__dirname, '../../assets/images/logo2.png');
      console.log('Cargando logo automáticamente desde:', logoPath);
      
      // Leer imagen y convertir a base64
      const logoBuffer = await fs.readFile(logoPath);
      // Si el archivo realmente fuera PNG, sería:
      let mimeType = 'image/png';
      
      logoBase64 = `data:${mimeType};base64,${logoBuffer.toString('base64')}`;
      console.log('Logo convertido a base64 exitosamente');
      
    } catch (logoError) {
      console.warn('No se pudo cargar el logo automáticamente:', logoError.message);
      logoBase64 = null;
    }
    
    // Agregar logoBase64 a los datos del template
    const templateData = {
      ...data,
      logoBase64: logoBase64
    };
    
    // Compilar template con Handlebars
    const template = handlebars.compile(templateSource);
    
    // Generar HTML con datos
    const html = template(templateData);
    
    return html;
    
  } catch (error) {
    console.error('Error generando HTML:', error);
    throw new Error(`Error al generar HTML: ${error.message}`);
  }
}

module.exports = {
  generateInvoicePDF,
  generateInvoiceHTML
};
