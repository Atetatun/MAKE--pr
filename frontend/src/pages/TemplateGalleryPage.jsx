import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

/**
 * TemplateGalleryPage
 *
 * User Flow (PRD.md Section 6):
 *   Template Gallery → Select Template → CV Builder
 *
 * Features (PRD.md Section 4.1):
 *   - Browse 3 templates in grid layout
 *   - Preview live before choosing
 *   - Click-to-use instant to builder
 *
 * Layout (design-system.md Section 3):
 *   Grid: 3 cols desktop, 2 tablet, 1 mobile
 *   Card aspect ratio: ~4:5
 *   Gap: 24px
 */

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and classic layout. Perfect for corporate roles and traditional industries.',
    badge: 'Most Popular',
    badgeColor: 'bg-navy text-white',
    preview: {
      bg: '#1e3a8a',
      accent: '#0ea5e9',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and modern design. Ideal for designers, developers, and creative roles.',
    badge: 'Trending',
    badgeColor: 'bg-orange text-white',
    preview: {
      bg: '#f97316',
      accent: '#1e3a8a',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant. Timeless layout that works for any industry.',
    badge: 'ATS-Optimized',
    badgeColor: 'bg-success text-white',
    preview: {
      bg: '#0f172a',
      accent: '#0ea5e9',
    },
  },
]

export default function TemplateGalleryPage() {
  const navigate = useNavigate()
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const handleUseTemplate = (templateId) => {
    // Navigate to builder with the selected template
    navigate(`/builder/${templateId}`)
  }

  return (
    <div className="page-container py-10">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-navy font-heading mb-3">
          Choose Your Template
        </h1>
        <p className="text-body-lg text-text-muted font-body max-w-[500px] mx-auto">
          Pick a template to get started. You can switch templates at any time in the builder.
        </p>
      </div>

      {/* Template Grid (design-system.md: 3-col desktop, 2-col tablet, 1-col mobile, 24px gap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={() => setPreviewTemplate(template)}
            onUse={() => handleUseTemplate(template.id)}
          />
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate ? `${previewTemplate.name} Template` : ''}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleUseTemplate(previewTemplate.id)
                setPreviewTemplate(null)
              }}
            >
              Use This Template
              <ArrowRight size={16} />
            </Button>
          </>
        }
      >
        {previewTemplate && (
          <div>
            <div
              className="w-full h-64 rounded-lg mb-4 flex items-center justify-center"
              style={{ background: previewTemplate.preview.bg }}
            >
              <span className="text-white font-heading font-semibold text-xl opacity-60">
                {previewTemplate.name} Preview
              </span>
            </div>
            <p className="text-body text-text-muted font-body">{previewTemplate.description}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function TemplateCard({ template, onPreview, onUse }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-light hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 group">
      {/* Template Preview Area (~4:5 aspect ratio) */}
      <div
        className="relative w-full aspect-[4/5] flex items-center justify-center"
        style={{ background: template.preview.bg }}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-caption font-semibold font-heading ${template.badgeColor}`}>
            {template.badge}
          </span>
        </div>

        {/* Preview placeholder - will be real template preview in Phase 3 */}
        <div className="text-center px-8">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-bold text-white font-heading">
              {template.name[0]}
            </span>
          </div>
          <p className="text-white/80 text-body-sm font-body">
            {template.name} Layout
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-4 py-2 bg-white text-navy font-semibold text-sm rounded-lg transition-transform duration-200 hover:scale-105 font-heading"
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-h3 font-semibold text-navy font-heading mb-2">{template.name}</h3>
        <p className="text-body-sm text-text-muted font-body mb-4">{template.description}</p>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={onUse} className="flex-1">
            Use Template
          </Button>
          <Button variant="ghost" size="sm" onClick={onPreview}>
            <Eye size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
