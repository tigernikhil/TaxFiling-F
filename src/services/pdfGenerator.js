const PDFDocument = require('pdfkit');

class PDFGenerator {
  generateITRReport(taxReturn, stream) {
    const doc = new PDFDocument();
    doc.pipe(stream);

    // Header
    doc.fontSize(20).text('Income Tax Return', { align: 'center' });
    doc.fontSize(12).text(`Financial Year: ${taxReturn.financialYear}`, { align: 'center' });
    doc.moveDown();

    // Personal Info
    doc.fontSize(14).text('Personal Information', { underline: true });
    doc.fontSize(11).text(`Name: ${taxReturn.user.name}`);
    doc.text(`PAN: ${taxReturn.user.pan}`);
    doc.text(`Aadhaar: ${taxReturn.user.aadhaar}`);
    doc.moveDown();

    // Income Summary
    doc.fontSize(14).text('Income Summary', { underline: true });
    doc.text(`Gross Income: ₹${taxReturn.income.total}`);
    doc.text(`Total Deductions: ₹${taxReturn.deductions.total}`);
    doc.text(`Taxable Income: ₹${taxReturn.income.total - taxReturn.deductions.total}`);
    doc.moveDown();

    // Tax Computation
    doc.fontSize(14).text('Tax Computation', { underline: true });
    doc.text(`Old Regime Tax: ₹${taxReturn.taxComputations?.oldRegime?.totalTax}`);
    doc.text(`New Regime Tax: ₹${taxReturn.taxComputations?.newRegime?.totalTax}`);
    doc.text(`Selected Regime: ${taxReturn.selectedRegime}`);

    doc.end();
  }
}

module.exports = new PDFGenerator();
