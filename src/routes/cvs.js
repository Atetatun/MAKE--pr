const express = require('express');
const { supabase } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /cvs - List all CVs for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('cvs')
      .select('id, template_id, name, created_at, updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    res.json({ cvs: data });
  } catch (error) {
    console.error('List CVs error:', error);
    res.status(500).json({ error: 'Failed to fetch CVs' });
  }
});

// GET /cvs/:id - Get CV by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json({ cv: data });
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({ error: 'Failed to fetch CV' });
  }
});

// POST /cvs - Create new CV
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { template_id, name } = req.body;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('cvs')
      .insert([
        {
          user_id: userId,
          template_id: template_id || 1,
          name: name || 'Untitled CV',
          data: {
            header: { name: '', email: '', phone: '', location: '' },
            summary: { text: '' },
            experience: [],
            education: [],
            skills: [],
            projects: [],
          },
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ cv: data[0] });
  } catch (error) {
    console.error('Create CV error:', error);
    res.status(500).json({ error: 'Failed to create CV' });
  }
});

// PUT /cvs/:id - Update CV
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { data: cvData } = req.body;

    // Verify ownership
    const { data: existing } = await supabase
      .from('cvs')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (!existing) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const { data, error } = await supabase
      .from('cvs')
      .update({
        data: cvData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ cv: data[0], message: 'CV updated' });
  } catch (error) {
    console.error('Update CV error:', error);
    res.status(500).json({ error: 'Failed to update CV' });
  }
});

// POST /cvs/:id/save-progress - Auto-save CV progress
router.post('/:id/save-progress', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { cv: cvData } = req.body;

    // Verify ownership
    const { data: existing } = await supabase
      .from('cvs')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (!existing) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const { data, error } = await supabase
      .from('cvs')
      .update({
        data: cvData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      cv: data[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// DELETE /cvs/:id - Delete CV
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ message: 'CV deleted' });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({ error: 'Failed to delete CV' });
  }
});

module.exports = router;
