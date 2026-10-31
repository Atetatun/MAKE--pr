const express = require('express');
const { openai } = require('../config/openai');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Prompt templates per section
const prompts = {
  experience: (input) => `You are a professional resume writer. Generate 3 different professional experience descriptions based on this input:
Position: ${input.position}
Company: ${input.company}
Duration: ${input.duration}
Key achievements/responsibilities: ${input.achievements}

Generate 3 unique, professional bullet points or paragraphs (each option should be distinct and highlight different strengths). Make them ATS-friendly (no special characters, clear keywords). Return as JSON array with 3 strings.`,

  skills: (input) => `You are a career expert. Based on this information, suggest 3 different sets of relevant skills:
Position/Role: ${input.position}
Experience: ${input.experience}
Industry: ${input.industry}

Generate 3 different skill sets (comma-separated, 5-8 skills each). Return as JSON array with 3 strings.`,

  summary: (input) => `You are a professional resume writer. Generate 3 different professional summaries based on this:
Position: ${input.position}
Years of experience: ${input.yearsExperience}
Key strengths: ${input.strengths}
Industry: ${input.industry}

Generate 3 unique, professional summaries (2-3 sentences each, ATS-friendly). Return as JSON array with 3 strings.`,

  projects: (input) => `You are a professional resume writer. Generate 3 different project descriptions based on:
Project name: ${input.name}
Tech stack: ${input.tech}
Your role: ${input.role}
Outcome/Impact: ${input.outcome}

Generate 3 different project descriptions (2-3 sentences each, highlighting different aspects). Return as JSON array with 3 strings.`,

  education: (input) => `You are a professional resume writer. Generate 3 different education entry descriptions based on:
School/University: ${input.school}
Degree: ${input.degree}
Field: ${input.field}
Graduation year: ${input.year}

Generate 3 different education descriptions if applicable (including honors, relevant coursework, etc). Return as JSON array with 3 strings.`,
};

// POST /ai/generate - Generate text with OpenAI
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { section, input } = req.body;

    if (!section || !input) {
      return res.status(400).json({ error: 'Section and input required' });
    }

    if (!prompts[section]) {
      return res.status(400).json({ error: `Invalid section: ${section}` });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const prompt = prompts[section](input);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume and CV writer. Generate high-quality, ATS-friendly content. Always return valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    let options = [];
    try {
      const content = response.choices[0].message.content;
      // Try to parse as JSON array
      const parsed = JSON.parse(content);
      options = Array.isArray(parsed) ? parsed : [content];
    } catch (e) {
      // If not valid JSON, split by newlines or return as is
      options = response.choices[0].message.content
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 3);
    }

    // Ensure we have exactly 3 options
    while (options.length < 3) {
      options.push('');
    }
    options = options.slice(0, 3);

    res.json({
      section,
      options: options.map(opt => (typeof opt === 'string' ? opt : JSON.stringify(opt))),
      usage: {
        prompt_tokens: response.usage.prompt_tokens,
        completion_tokens: response.usage.completion_tokens,
        total_tokens: response.usage.total_tokens,
      },
    });
  } catch (error) {
    console.error('AI generate error:', error);

    // Return user-friendly error
    if (error.status === 401) {
      return res.status(500).json({ error: 'OpenAI API key invalid' });
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again later.' });
    }

    res.status(500).json({ error: 'Failed to generate text' });
  }
});

module.exports = router;
