const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /ai/generate - Generate text with AI (Experience, Skills, Summary)
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { section, input } = req.body;

    if (!section || !input) {
      return res.status(400).json({ error: 'Section and input required' });
    }

    // TODO: Integrate with OpenAI API
    // For now, return mock options

    const mockOptions = {
      experience: [
        `Led development of ${input.position} at ${input.company}. Improved system performance by 40% through optimization efforts.`,
        `Managed ${input.position} role, overseeing team of 5 engineers. Delivered 3 major projects on time and within budget.`,
        `Contributed to ${input.position} position, focusing on ${input.description}. Gained expertise in modern web technologies.`,
      ],
      skills: [
        'JavaScript, React, Node.js, Python, SQL',
        'Full-stack development, REST APIs, Agile methodologies',
        'UI/UX Design, Performance optimization, DevOps',
      ],
      summary: [
        `Experienced ${input.position} professional with ${input.years || 3}+ years in ${input.field || 'technology'}. Proven track record of delivering high-quality solutions.`,
        `Results-driven professional specializing in ${input.field || 'software development'}. Passionate about building scalable, user-centric products.`,
        `Dedicated ${input.position} with expertise in ${input.field || 'full-stack development'}. Known for attention to detail and collaborative approach.`,
      ],
    };

    const options = mockOptions[section] || [];

    res.json({
      section,
      options: options.slice(0, 3),
    });
  } catch (error) {
    console.error('AI generate error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

module.exports = router;
