const express = require('express');
const { supabase } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');
const { generatePDF } = require('../config/pdf');
const { sendEmail } = require('../config/email');
const { triggerWebhook } = require('../config/webhook');

const router = express.Router();

// POST /export/pdf - Export CV as PDF
router.post('/pdf', authMiddleware, async (req, res) => {
  try {
    const { cvId, email: sendToEmail } = req.body;
    const userId = req.user.id;

    if (!cvId) {
      return res.status(400).json({ error: 'CV ID required' });
    }

    // Get CV data
    const { data: cv, error: cvError } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', cvId)
      .eq('user_id', userId)
      .single();

    if (cvError || !cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(cv.data, cv.template_id);

    // Trigger webhook
    await triggerWebhook(userId, 'pdf_exported', { cvId, cvName: cv.name });

    // Send email if requested
    if (sendToEmail) {
      try {
        await sendEmail(
          sendToEmail,
          `Your CV Export - ${cv.name}`,
          `<p>Your CV has been exported successfully.</p><p>Check the attached file.</p>`
        );

        // Trigger email sent webhook
        await triggerWebhook(userId, 'email_sent', { cvId, recipient: sendToEmail });
      } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Don't fail the request, still return PDF
      }
    }

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cv.name}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(500).json({ error: 'Failed to export PDF' });
  }
});

// POST /export/json - Export CV as JSON
router.post('/json', authMiddleware, async (req, res) => {
  try {
    const { cvId } = req.body;
    const userId = req.user.id;

    if (!cvId) {
      return res.status(400).json({ error: 'CV ID required' });
    }

    const { data: cv, error: cvError } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', cvId)
      .eq('user_id', userId)
      .single();

    if (cvError || !cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Trigger webhook
    await triggerWebhook(userId, 'json_exported', { cvId, cvName: cv.name });

    // Return CV as downloadable JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${cv.name}.json"`);
    res.json(cv.data);
  } catch (error) {
    console.error('Export JSON error:', error);
    res.status(500).json({ error: 'Failed to export JSON' });
  }
});

module.exports = router;
