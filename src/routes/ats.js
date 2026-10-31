const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { triggerWebhook } = require('../config/webhook');

const router = express.Router();

// ATS validation rules
const atsRules = {
  requiredFields: [
    { field: 'header.name', name: 'Full Name', points: 15 },
    { field: 'header.email', name: 'Email Address', points: 10 },
    { field: 'experience', name: 'Work Experience', points: 20, minItems: 1 },
    { field: 'education', name: 'Education', points: 15, minItems: 1 },
    { field: 'skills', name: 'Skills', points: 10, minItems: 3 },
  ],
  formatting: [
    { check: 'noSpecialChars', name: 'Avoid special characters', points: 5 },
    { check: 'clearHeadings', name: 'Use clear section headings', points: 5 },
    { check: 'standardFont', name: 'Use standard fonts', points: 5 },
    { check: 'noImages', name: 'Minimize images/graphics', points: 5 },
  ],
  keywords: [
    { check: 'hasActionVerbs', name: 'Include action verbs', points: 5 },
    { check: 'hasKeywords', name: 'Include relevant keywords', points: 5 },
    { check: 'hasMetrics', name: 'Include measurable results', points: 5 },
  ],
};

// Helper to check field exists
const hasField = (obj, path) => {
  return path.split('.').reduce((o, p) => o?.[p], obj) !== undefined && path.split('.').reduce((o, p) => o?.[p], obj) !== null && path.split('.').reduce((o, p) => o?.[p], obj) !== '';
};

// Helper to check array length
const hasMinItems = (arr, min = 1) => Array.isArray(arr) && arr.length >= min;

// POST /ats/check - Enhanced ATS compatibility check
router.post('/check', authMiddleware, async (req, res) => {
  try {
    const { cv } = req.body;
    const userId = req.user.id;

    if (!cv) {
      return res.status(400).json({ error: 'CV data required' });
    }

    const issues = [];
    let score = 0;
    let maxScore = 100;

    // Check required fields
    atsRules.requiredFields.forEach((rule) => {
      if (rule.minItems) {
        if (!hasMinItems(cv[rule.field.split('.')[0]], rule.minItems)) {
          issues.push({
            severity: 'error',
            message: `${rule.name}: Add at least ${rule.minItems} entry`,
            field: rule.field,
          });
        } else {
          score += rule.points;
        }
      } else {
        if (!hasField(cv, rule.field)) {
          issues.push({
            severity: 'error',
            message: `${rule.name} is required`,
            field: rule.field,
          });
        } else {
          score += rule.points;
        }
      }
    });

    // Check formatting
    const allText = JSON.stringify(cv).toLowerCase();

    if (!allText.match(/[^a-z0-9\s@.\-]/g)) {
      score += 5; // No special chars
    } else {
      issues.push({
        severity: 'warning',
        message: 'Avoid special characters (keep: - . @)',
        field: 'formatting',
      });
    }

    if (cv.experience?.some(e => e.description?.length > 50)) {
      score += 5; // Has detailed descriptions
    }

    if (cv.skills?.length >= 5) {
      score += 5; // Good number of skills
    }

    // Check for action verbs in experience descriptions
    const actionVerbs = ['led', 'managed', 'developed', 'created', 'improved', 'increased', 'designed', 'implemented'];
    const hasActionVerbs = cv.experience?.some(e => 
      actionVerbs.some(verb => e.description?.toLowerCase().includes(verb))
    );
    if (hasActionVerbs) {
      score += 5;
    } else {
      issues.push({
        severity: 'warning',
        message: 'Use action verbs (Led, Managed, Developed, etc.)',
        field: 'experience',
      });
    }

    // Check for quantifiable results
    const hasMetrics = cv.experience?.some(e => 
      e.description?.match(/\d+%|\$\d+|increased|improved|reduced/)
    );
    if (hasMetrics) {
      score += 5;
    } else {
      issues.push({
        severity: 'info',
        message: 'Include measurable results (e.g., increased by 40%)',
        field: 'experience',
      });
    }

    // Email format validation
    if (cv.header?.email && !cv.header.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      issues.push({
        severity: 'error',
        message: 'Invalid email format',
        field: 'header.email',
      });
      score -= 5;
    } else if (cv.header?.email) {
      score += 5;
    }

    // Phone format validation
    if (cv.header?.phone) {
      if (cv.header.phone.match(/^[\d\s\-\+\(\)]+$/)) {
        score += 3;
      } else {
        issues.push({
          severity: 'warning',
          message: 'Phone format should contain only numbers and basic symbols',
          field: 'header.phone',
        });
      }
    }

    score = Math.max(0, Math.min(100, score));

    // Trigger webhook
    await triggerWebhook(userId, 'ats_checked', { score, issueCount: issues.length });

    res.json({
      score,
      maxScore: 100,
      percentage: score,
      issues: issues.sort((a, b) => {
        const severity = { error: 3, warning: 2, info: 1 };
        return (severity[b.severity] || 0) - (severity[a.severity] || 0);
      }),
      recommendations: [
        'Include all required sections (Name, Email, Experience, Education, Skills)',
        'Use action verbs to describe achievements',
        'Quantify results with metrics (percentages, amounts, numbers)',
        'Keep format simple and text-based',
        'Use standard fonts and clear structure',
        'Avoid images, tables, and special formatting',
        'Include relevant keywords for the job',
        'Use consistent date formats',
      ],
      passedChecks: [
        hasField(cv, 'header.name') ? '✓ Name provided' : null,
        hasField(cv, 'header.email') ? '✓ Email provided' : null,
        hasMinItems(cv.experience, 1) ? '✓ Work experience included' : null,
        hasMinItems(cv.education, 1) ? '✓ Education included' : null,
        cv.skills?.length >= 5 ? '✓ Adequate skills listed' : null,
      ].filter(Boolean),
    });
  } catch (error) {
    console.error('ATS check error:', error);
    res.status(500).json({ error: 'Failed to check ATS score' });
  }
});

module.exports = router;
