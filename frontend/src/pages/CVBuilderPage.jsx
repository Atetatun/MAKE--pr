import { useParams, Link } from 'react-router-dom'
import { Save, Download, Sparkles, ShieldCheck, ArrowLeft, FileText } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import { Input, Textarea, FormField } from '../components/ui/Input'
import { useState } from 'react'

/**
 * CVBuilderPage - 2-column layout: Form (left) + Preview (right)
 *
 * Plan.md Week 4 deliverable: Full working CV builder (form + save)
 *
 * Layout (design-system.md Section 3):
 *   Left (Form): 45% width, scrollable
 *   Right (Preview): 55% width, sticky
 *   Gap: 32px
 *   Total max width: 1400px
 *
 * Sections (PRD.md Section 4.2):
 *   Header, Summary, Experience, Education, Skills, Projects
 */

const SECTION_TABS = [
  { id: 'header',     label: 'Header'     },
  { id: 'summary',    label: 'Summary'    },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
]

export default function CVBuilderPage() {
  const { id: templateId } = useParams()
  const [activeTab, setActiveTab] = useState('header')
  const [saving, setSaving] = useState(false)

  // CV Data state (Fahri will connect to Zustand store)
  const [cvData, setCvData] = useState({
    header: { name: '', email: '', phone: '', location: '', title: '' },
    summary: { text: '' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  })

  const updateHeader = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO (Fahri): connect to API POST /cvs/:id/save-progress
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6">
      {/* Builder Header Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link
            to="/templates"
            className="flex items-center gap-2 text-body-sm text-text-muted hover:text-navy transition-colors duration-150 no-underline font-heading"
          >
            <ArrowLeft size={16} />
            Templates
          </Link>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-cyan" />
            <span className="text-body font-semibold text-navy font-heading capitalize">
              {templateId} Template
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* ATS Checker Button (PRD 4.4) */}
          <Button variant="secondary" size="sm">
            <ShieldCheck size={16} />
            ATS Check
          </Button>

          {/* AI Auto-Write Button (PRD 4.3) */}
          <Button variant="ghost" size="sm">
            <Sparkles size={16} />
            AI Write
          </Button>

          {/* PDF Export (PRD 4.2) */}
          <Button variant="secondary" size="sm">
            <Download size={16} />
            Export PDF
          </Button>

          {/* Save */}
          <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>

      {/* 2-Column Builder Layout */}
      <div className="flex gap-8">
        {/* ── Left: Form (45%) ── */}
        <div className="builder-left min-w-0" style={{ flex: '0 0 45%' }}>
          {/* Section Tabs */}
          <Tabs
            tabs={SECTION_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-6"
          />

          {/* Header Section */}
          <TabPanel id="header" activeTab={activeTab}>
            <div className="flex flex-col gap-6">
              <h2 className="text-h3 font-semibold text-navy font-heading">Personal Information</h2>

              <FormField label="Full Name" htmlFor="name" required>
                <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  value={cvData.header.name}
                  onChange={(e) => updateHeader('name', e.target.value)}
                />
              </FormField>

              <FormField label="Professional Title" htmlFor="title">
                <Input
                  id="title"
                  placeholder="e.g. Frontend Developer"
                  value={cvData.header.title}
                  onChange={(e) => updateHeader('title', e.target.value)}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Email" htmlFor="email" required>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={cvData.header.email}
                    onChange={(e) => updateHeader('email', e.target.value)}
                  />
                </FormField>

                <FormField label="Phone" htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    value={cvData.header.phone}
                    onChange={(e) => updateHeader('phone', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Location" htmlFor="location">
                <Input
                  id="location"
                  placeholder="e.g. Jakarta, Indonesia"
                  value={cvData.header.location}
                  onChange={(e) => updateHeader('location', e.target.value)}
                />
              </FormField>
            </div>
          </TabPanel>

          {/* Summary Section */}
          <TabPanel id="summary" activeTab={activeTab}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Professional Summary</h2>
                <Button variant="ghost" size="sm">
                  <Sparkles size={14} />
                  Generate with AI
                </Button>
              </div>
              <FormField label="Summary" htmlFor="summary" hint="2-4 sentences about your professional background and goals.">
                <Textarea
                  id="summary"
                  placeholder="Write a brief professional summary..."
                  value={cvData.summary.text}
                  onChange={(e) =>
                    setCvData((prev) => ({ ...prev, summary: { text: e.target.value } }))
                  }
                  className="min-h-[120px]"
                />
              </FormField>
            </div>
          </TabPanel>

          {/* Experience Section */}
          <TabPanel id="experience" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Work Experience</h2>
                <Button variant="secondary" size="sm">
                  + Add Experience
                </Button>
              </div>
              {/* TODO (Cici/Faiz): Implement repeatable experience fields in Week 4 */}
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <p className="text-body-sm text-text-muted font-body mb-3">
                  No experience added yet.
                </p>
                <Button variant="primary" size="sm">
                  + Add Work Experience
                </Button>
              </div>
            </div>
          </TabPanel>

          {/* Education Section */}
          <TabPanel id="education" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Education</h2>
                <Button variant="secondary" size="sm">+ Add Education</Button>
              </div>
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <p className="text-body-sm text-text-muted font-body mb-3">No education added yet.</p>
                <Button variant="primary" size="sm">+ Add Education</Button>
              </div>
            </div>
          </TabPanel>

          {/* Skills Section */}
          <TabPanel id="skills" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Skills</h2>
                <Button variant="secondary" size="sm">+ Add Skill</Button>
              </div>
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <p className="text-body-sm text-text-muted font-body mb-3">No skills added yet.</p>
                <Button variant="primary" size="sm">+ Add Skills</Button>
              </div>
            </div>
          </TabPanel>

          {/* Projects Section */}
          <TabPanel id="projects" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Projects</h2>
                <Button variant="secondary" size="sm">+ Add Project</Button>
              </div>
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <p className="text-body-sm text-text-muted font-body mb-3">No projects added yet.</p>
                <Button variant="primary" size="sm">+ Add Project</Button>
              </div>
            </div>
          </TabPanel>
        </div>

        {/* ── Right: Preview (55%) ── */}
        <div
          className="min-w-0 sticky top-20 self-start overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-light"
          style={{ flex: '0 0 55%', maxHeight: 'calc(100vh - 120px)' }}
        >
          <CVPreview cvData={cvData} templateId={templateId} />
        </div>
      </div>
    </div>
  )
}

/**
 * CVPreview - Live CV preview (right column)
 * Phase 3 (Week 5) will implement real template styling
 */
function CVPreview({ cvData, templateId }) {
  const { header, summary } = cvData

  return (
    <div className="p-8 min-h-[700px]">
      {/* Preview Header Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <span className="text-caption text-text-muted font-heading uppercase tracking-wider">
          Preview — {templateId} Template
        </span>
        <span className="text-caption text-text-muted font-body">
          Updates in real-time
        </span>
      </div>

      {/* CV Content Preview */}
      <div className="font-body">
        {/* Header */}
        {(header.name || header.title) ? (
          <div className="mb-6 pb-6 border-b-2 border-navy">
            <h1 className="text-2xl font-bold text-navy font-heading mb-1">
              {header.name || 'Your Name'}
            </h1>
            {header.title && (
              <p className="text-body text-cyan font-semibold">{header.title}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              {header.email && (
                <span className="text-body-sm text-text-muted">{header.email}</span>
              )}
              {header.phone && (
                <span className="text-body-sm text-text-muted">{header.phone}</span>
              )}
              {header.location && (
                <span className="text-body-sm text-text-muted">{header.location}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-6 pb-6 border-b-2 border-slate-200">
            <div className="h-6 bg-slate-100 rounded w-48 mb-2" />
            <div className="h-4 bg-slate-100 rounded w-32 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-64" />
          </div>
        )}

        {/* Summary */}
        {summary.text && (
          <div className="mb-6">
            <h2 className="text-body font-semibold text-navy font-heading uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Summary
            </h2>
            <p className="text-body-sm text-text-primary font-body leading-relaxed">{summary.text}</p>
          </div>
        )}

        {/* Placeholder sections */}
        {!header.name && !summary.text && (
          <div className="text-center py-16">
            <FileText size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-body-sm text-text-muted font-body">
              Start filling in your details on the left to see your CV preview here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
