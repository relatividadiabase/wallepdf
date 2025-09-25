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
    
    // Compilar template con Handlebars
    const template = handlebars.compile(templateSource);
    
    // Generar HTML con datos
    const html = template(data);
    
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
