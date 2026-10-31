const express = require('express');
const { supabase } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /export/pdf - Export CV as PDF
router.post('/pdf', authMiddleware, async (req, res) => {
  try {
    const { cvId, format = 'pdf' } = req.body;
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

    // TODO: Generate PDF from CV data
    // For now, return ready-to-generate response
    res.json({
      success: true,
      message: 'PDF export initiated',
      cv: {
        id: cv.id,
        name: cv.name,
        data: cv.data,
      },
      downloadUrl: `/api/export/download/${cv.id}`,
    });
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
