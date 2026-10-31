const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

// Generate PDF from CV data
const generatePDF = async (cvData, templateId = 1) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      doc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      doc.on('error', reject);

      // Header section
      if (cvData.header) {
        doc.fontSize(20).font('Helvetica-Bold').text(cvData.header.name || 'CV', { align: 'center' });
        doc.fontSize(10).font('Helvetica').text(cvData.header.email || '', { align: 'center' });
        if (cvData.header.phone) doc.text(cvData.header.phone, { align: 'center' });
        if (cvData.header.location) doc.text(cvData.header.location, { align: 'center' });
        doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke();
        doc.moveDown();
      }

      // Summary section
      if (cvData.summary?.text) {
        doc.fontSize(12).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
        doc.fontSize(10).font('Helvetica').text(cvData.summary.text);
        doc.moveDown();
      }

      // Experience section
      if (cvData.experience?.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('EXPERIENCE');
        cvData.experience.forEach((exp) => {
          doc.fontSize(10).font('Helvetica-Bold').text(`${exp.position} at ${exp.company}`);
          if (exp.duration) doc.fontSize(9).font('Helvetica').text(exp.duration, { textColor: '#666666' });
          if (exp.description) doc.fontSize(10).font('Helvetica').text(exp.description);
          doc.moveDown(0.5);
        });
        doc.moveDown();
      }

      // Education section
      if (cvData.education?.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION');
        cvData.education.forEach((edu) => {
          doc.fontSize(10).font('Helvetica-Bold').text(`${edu.degree} in ${edu.field}`);
          doc.fontSize(9).font('Helvetica').text(`${edu.school}, ${edu.year}`, { textColor: '#666666' });
          doc.moveDown(0.5);
        });
        doc.moveDown();
      }

      // Skills section
      if (cvData.skills?.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('SKILLS');
        doc.fontSize(10).font('Helvetica').text(cvData.skills.join(', '));
        doc.moveDown();
      }

      // Projects section
      if (cvData.projects?.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('PROJECTS');
        cvData.projects.forEach((proj) => {
          doc.fontSize(10).font('Helvetica-Bold').text(proj.title);
          if (proj.description) doc.fontSize(10).font('Helvetica').text(proj.description);
          if (proj.link) doc.fontSize(9).font('Helvetica').text(`Link: ${proj.link}`, { textColor: '#0066cc' });
          doc.moveDown(0.5);
        });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generatePDF };
