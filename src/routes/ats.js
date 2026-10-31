const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /ats-check - Check CV for ATS compatibility
router.post('/check', authMiddleware, async (req, res) => {
  try {
    const { cv } = req.body;

    if (!cv) {
      return res.status(400).json({ error: 'CV data required' });
    }

    // TODO: Implement proper ATS validation logic
    // For now, return mock results

    const issues = [];
    let score = 100;

    // Check for required fields
    if (!cv.header?.name) {
      issues.push({ severity: 'error', message: 'Name is required' });
      score -= 20;
    }

    if (!cv.header?.email) {
      issues.push({ severity: 'error', message: 'Email is required' });
      score -= 20;
    }

    if (!cv.experience || cv.experience.length === 0) {
      issues.push({ severity: 'warning', message: 'Add at least one experience entry' });
      score -= 10;
    }

    if (!cv.education || cv.education.length === 0) {
      issues.push({ severity: 'warning', message: 'Add education information' });
      score -= 10;
    }

    if (!cv.skills || cv.skills.length === 0) {
      issues.push({ severity: 'warning', message: 'Add relevant skills' });
      score -= 10;
    }

    // Check for formatting issues
    if (cv.header?.email && !cv.header.email.includes('@')) {
      issues.push({ severity: 'error', message: 'Invalid email format' });
      score -= 10;
    }

    score = Math.max(0, score);

    res.json({
      score,
      issues,
      recommendations: [
        'Ensure all required fields are filled',
        'Use standard fonts (Arial, Calibri, Times New Roman)',
        'Avoid graphics and images where possible',
        'Use clear section headings',
        'Keep file size under 5MB',
      ],
    });
  } catch (error) {
    console.error('ATS check error:', error);
    res.status(500).json({ error: 'Failed to check ATS score' });
  }
});

module.exports = router;
