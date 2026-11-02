import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern. Perfect for corporate roles.',
    colors: ['#1e3a8a', '#e2e8f0'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and colorful. Great for designers and creatives.',
    colors: ['#f97316', '#1e3a8a'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant. Less is more.',
    colors: ['#0f172a', '#f8fafc'],
  },
];

export function TemplateGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    // Redirect to builder with template
    window.location.href = `/builder?template=${templateId}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-4 font-heading">
            Choose Your Template
          </h1>
          <p className="text-text-muted mb-12">
            Select a template to get started. You can customize it completely in the builder.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:scale-105" hover={true}>
                <div className="h-40 rounded-lg mb-6 flex items-end justify-center overflow-hidden bg-gradient-to-t from-slate-200 to-slate-100"
                  style={{
                    background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`,
                  }}
                >
                  <div className="text-white font-bold text-2xl pb-4 font-heading">{template.name}</div>
                </div>

                <h3 className="text-xl font-semibold text-navy mb-2 font-heading">
                  {template.name}
                </h3>
                <p className="text-text-muted text-sm mb-6">
                  {template.description}
                </p>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  Use Template
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
