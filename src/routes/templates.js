const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

// GET /templates - List all templates
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json({ templates: data });
  } catch (error) {
    console.error('List templates error:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// GET /templates/:id - Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json({ template: data });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});

module.exports = router;
