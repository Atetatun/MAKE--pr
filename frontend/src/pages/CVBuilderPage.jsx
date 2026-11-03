import { useParams, Link } from 'react-router-dom'
import { Save, Download, Sparkles, ShieldCheck, ArrowLeft, FileText, Plus, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import { Input, Textarea, FormField, Select } from '../components/ui/Input'
import { Spinner } from '../components/ui/Spinner'
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // CV Data state (Fahri will connect to Zustand store)
  const [cvData, setCvData] = useState({
    header: { name: '', email: '', phone: '', location: '', title: '' },
    summary: { text: '' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  })

  // Handle window resize for responsive layout
  useState(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateHeader = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }))
  }

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', position: '', duration: '', description: '' }],
    }))
  }

  const updateExperience = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), school: '', degree: '', field: '', year: '' }],
    }))
  }

  const updateEducation = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'intermediate' }],
    }))
  }

  const updateSkill = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }))
  }

  const removeSkill = (id) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addProject = () => {
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now(), title: '', description: '', link: '', year: '' }],
    }))
  }

  const updateProject = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }))
  }

  const removeProject = (id) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO (Fahri): connect to API POST /cvs/:id/save-progress
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  // Mobile layout: show form OR preview, not both
  if (isMobile) {
    return <CVBuilderMobileLayout 
      templateId={templateId}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      cvData={cvData}
      updateHeader={updateHeader}
      addExperience={addExperience}
      updateExperience={updateExperience}
      removeExperience={removeExperience}
      addEducation={addEducation}
      updateEducation={updateEducation}
      removeEducation={removeEducation}
      addSkill={addSkill}
      updateSkill={updateSkill}
      removeSkill={removeSkill}
      addProject={addProject}
      updateProject={updateProject}
      removeProject={removeProject}
      saving={saving}
      handleSave={handleSave}
    />
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
          <Button variant="primary" size="sm" onClick={handleSave}>
            {saving ? <Spinner size={16} /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save'}
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
                <Button variant="secondary" size="sm" onClick={addExperience}>
                  <Plus size={16} />
                  Add Experience
                </Button>
              </div>

              {cvData.experience.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-body-sm text-text-muted font-body mb-3">
                    No experience added yet.
                  </p>
                  <Button variant="primary" size="sm" onClick={addExperience}>
                    <Plus size={16} />
                    Add Work Experience
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cvData.experience.map((exp) => (
                    <ExperienceField
                      key={exp.id}
                      exp={exp}
                      onUpdate={updateExperience}
                      onRemove={removeExperience}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabPanel>

          {/* Education Section */}
          <TabPanel id="education" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Education</h2>
                <Button variant="secondary" size="sm" onClick={addEducation}>
                  <Plus size={16} />
                  Add Education
                </Button>
              </div>

              {cvData.education.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-body-sm text-text-muted font-body mb-3">No education added yet.</p>
                  <Button variant="primary" size="sm" onClick={addEducation}>
                    <Plus size={16} />
                    Add Education
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cvData.education.map((edu) => (
                    <EducationField
                      key={edu.id}
                      edu={edu}
                      onUpdate={updateEducation}
                      onRemove={removeEducation}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabPanel>

          {/* Skills Section */}
          <TabPanel id="skills" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Skills</h2>
                <Button variant="secondary" size="sm" onClick={addSkill}>
                  <Plus size={16} />
                  Add Skill
                </Button>
              </div>

              {cvData.skills.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-body-sm text-text-muted font-body mb-3">No skills added yet.</p>
                  <Button variant="primary" size="sm" onClick={addSkill}>
                    <Plus size={16} />
                    Add Skills
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cvData.skills.map((skill) => (
                    <SkillField
                      key={skill.id}
                      skill={skill}
                      onUpdate={updateSkill}
                      onRemove={removeSkill}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabPanel>

          {/* Projects Section */}
          <TabPanel id="projects" activeTab={activeTab}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-navy font-heading">Projects</h2>
                <Button variant="secondary" size="sm" onClick={addProject}>
                  <Plus size={16} />
                  Add Project
                </Button>
              </div>

              {cvData.projects.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-body-sm text-text-muted font-body mb-3">No projects added yet.</p>
                  <Button variant="primary" size="sm" onClick={addProject}>
                    <Plus size={16} />
                    Add Project
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cvData.projects.map((proj) => (
                    <ProjectField
                      key={proj.id}
                      project={proj}
                      onUpdate={updateProject}
                      onRemove={removeProject}
                    />
                  ))}
                </div>
              )}
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
 * CVBuilderMobileLayout - Stack layout for mobile (< 768px)
 */
function CVBuilderMobileLayout({
  templateId, activeTab, setActiveTab, cvData,
  updateHeader, addExperience, updateExperience, removeExperience,
  addEducation, updateEducation, removeEducation,
  addSkill, updateSkill, removeSkill,
  addProject, updateProject, removeProject,
  saving, handleSave
}) {
  return (
    <div className="px-4 py-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <Link
          to="/templates"
          className="flex items-center gap-2 text-body-sm text-text-muted no-underline"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <span className="text-body-sm font-semibold text-navy capitalize">
          {templateId} Template
        </span>
        <Button variant="primary" size="sm" onClick={handleSave}>
          {saving ? <Spinner size={14} /> : <Save size={14} />}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={SECTION_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6 -mx-4 px-4"
      />

      {/* Form Content - same as desktop, just stacked */}
      <div className="space-y-6 pb-10">
        {activeTab === 'header' && (
          <HeaderSection cvData={cvData} updateHeader={updateHeader} />
        )}
        {activeTab === 'summary' && (
          <SummarySection cvData={cvData} setCvData={() => {}} />
        )}
        {activeTab === 'experience' && (
          <ExperienceSection
            experiences={cvData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        )}
        {activeTab === 'education' && (
          <EducationSection
            educations={cvData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        )}
        {activeTab === 'skills' && (
          <SkillsSection
            skills={cvData.skills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsSection
            projects={cvData.projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onRemove={removeProject}
          />
        )}
      </div>
    </div>
  )
}

/**
 * ExperienceField - Repeatable work experience card
 */
function ExperienceField({ exp, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-body font-semibold text-navy font-heading">
          {exp.position || 'New Experience'}
        </h3>
        <button
          onClick={() => onRemove(exp.id)}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
          title="Delete experience"
        >
          <Trash2 size={16} className="text-error" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="Position" htmlFor={`pos-${exp.id}`}>
          <Input
            id={`pos-${exp.id}`}
            placeholder="e.g. Frontend Developer"
            value={exp.position}
            onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
          />
        </FormField>
        <FormField label="Company" htmlFor={`comp-${exp.id}`}>
          <Input
            id={`comp-${exp.id}`}
            placeholder="e.g. TechCorp"
            value={exp.company}
            onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Duration" htmlFor={`dur-${exp.id}`} hint="e.g. Jan 2021 - Present">
        <Input
          id={`dur-${exp.id}`}
          placeholder="Jan 2021 - Present"
          value={exp.duration}
          onChange={(e) => onUpdate(exp.id, 'duration', e.target.value)}
        />
      </FormField>

      <FormField label="Description" htmlFor={`desc-${exp.id}`}>
        <Textarea
          id={`desc-${exp.id}`}
          placeholder="Describe your responsibilities and achievements..."
          value={exp.description}
          onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
          className="min-h-[100px]"
        />
      </FormField>
    </div>
  )
}

/**
 * EducationField - Repeatable education card
 */
function EducationField({ edu, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-body font-semibold text-navy font-heading">
          {edu.school || 'New Education'}
        </h3>
        <button
          onClick={() => onRemove(edu.id)}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
          title="Delete education"
        >
          <Trash2 size={16} className="text-error" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="School" htmlFor={`school-${edu.id}`}>
          <Input
            id={`school-${edu.id}`}
            placeholder="e.g. University of Jakarta"
            value={edu.school}
            onChange={(e) => onUpdate(edu.id, 'school', e.target.value)}
          />
        </FormField>
        <FormField label="Degree" htmlFor={`degree-${edu.id}`}>
          <Input
            id={`degree-${edu.id}`}
            placeholder="e.g. Bachelor of Science"
            value={edu.degree}
            onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Field of Study" htmlFor={`field-${edu.id}`}>
          <Input
            id={`field-${edu.id}`}
            placeholder="e.g. Computer Science"
            value={edu.field}
            onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
          />
        </FormField>
        <FormField label="Graduation Year" htmlFor={`year-${edu.id}`}>
          <Input
            id={`year-${edu.id}`}
            placeholder="e.g. 2020"
            value={edu.year}
            onChange={(e) => onUpdate(edu.id, 'year', e.target.value)}
          />
        </FormField>
      </div>
    </div>
  )
}

/**
 * SkillField - Repeatable skill tag with level
 */
function SkillField({ skill, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-end gap-3">
      <div className="flex-1">
        <FormField label="Skill" htmlFor={`skill-${skill.id}`}>
          <Input
            id={`skill-${skill.id}`}
            placeholder="e.g. React, Node.js, Python"
            value={skill.name}
            onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
          />
        </FormField>
      </div>
      <div className="w-32">
        <FormField label="Level" htmlFor={`level-${skill.id}`}>
          <Select
            id={`level-${skill.id}`}
            value={skill.level}
            onChange={(e) => onUpdate(skill.id, 'level', e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </Select>
        </FormField>
      </div>
      <button
        onClick={() => onRemove(skill.id)}
        className="p-2 hover:bg-slate-200 rounded transition-colors"
        title="Delete skill"
      >
        <Trash2 size={16} className="text-error" />
      </button>
    </div>
  )
}

/**
 * ProjectField - Repeatable project card
 */
function ProjectField({ project, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-body font-semibold text-navy font-heading">
          {project.title || 'New Project'}
        </h3>
        <button
          onClick={() => onRemove(project.id)}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
          title="Delete project"
        >
          <Trash2 size={16} className="text-error" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="Project Title" htmlFor={`title-${project.id}`}>
          <Input
            id={`title-${project.id}`}
            placeholder="e.g. E-commerce Platform"
            value={project.title}
            onChange={(e) => onUpdate(project.id, 'title', e.target.value)}
          />
        </FormField>
        <FormField label="Year" htmlFor={`year-${project.id}`}>
          <Input
            id={`year-${project.id}`}
            placeholder="e.g. 2023"
            value={project.year}
            onChange={(e) => onUpdate(project.id, 'year', e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Description" htmlFor={`pdesc-${project.id}`}>
        <Textarea
          id={`pdesc-${project.id}`}
          placeholder="Describe your project, technologies used, and results..."
          value={project.description}
          onChange={(e) => onUpdate(project.id, 'description', e.target.value)}
          className="min-h-[100px]"
        />
      </FormField>

      <FormField label="Project Link (Optional)" htmlFor={`link-${project.id}`}>
        <Input
          id={`link-${project.id}`}
          type="url"
          placeholder="e.g. https://github.com/yourname/project"
          value={project.link}
          onChange={(e) => onUpdate(project.id, 'link', e.target.value)}
        />
      </FormField>
    </div>
  )
}

/**
 * Helper section components for mobile
 */
function HeaderSection({ cvData, updateHeader }) {
  return (
    <>
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
      <FormField label="Location" htmlFor="location">
        <Input
          id="location"
          placeholder="e.g. Jakarta, Indonesia"
          value={cvData.header.location}
          onChange={(e) => updateHeader('location', e.target.value)}
        />
      </FormField>
    </>
  )
}

function SummarySection({ cvData, setCvData }) {
  return (
    <>
      <h2 className="text-h3 font-semibold text-navy font-heading">Professional Summary</h2>
      <FormField label="Summary" htmlFor="summary" hint="2-4 sentences about your professional background.">
        <Textarea
          id="summary"
          placeholder="Write a brief professional summary..."
          value={cvData.summary.text}
          onChange={(e) => setCvData(e.target.value)}
          className="min-h-[120px]"
        />
      </FormField>
    </>
  )
}

function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-navy font-heading">Work Experience</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>
          <Plus size={16} />
          Add
        </Button>
      </div>
      {experiences.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-body-sm text-text-muted mb-3">No experience added yet.</p>
          <Button variant="primary" size="sm" onClick={onAdd}>
            <Plus size={16} />
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceField key={exp.id} exp={exp} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
        </div>
      )}
    </>
  )
}

function EducationSection({ educations, onAdd, onUpdate, onRemove }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-navy font-heading">Education</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>
          <Plus size={16} />
          Add
        </Button>
      </div>
      {educations.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-body-sm text-text-muted mb-3">No education added yet.</p>
          <Button variant="primary" size="sm" onClick={onAdd}>
            <Plus size={16} />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <EducationField key={edu.id} edu={edu} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
        </div>
      )}
    </>
  )
}

function SkillsSection({ skills, onAdd, onUpdate, onRemove }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-navy font-heading">Skills</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>
          <Plus size={16} />
          Add
        </Button>
      </div>
      {skills.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-body-sm text-text-muted mb-3">No skills added yet.</p>
          <Button variant="primary" size="sm" onClick={onAdd}>
            <Plus size={16} />
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {skills.map((skill) => (
            <SkillField key={skill.id} skill={skill} onUpdate={onUpdate} onRemove={removeSkill} />
          ))}
        </div>
      )}
    </>
  )
}

function ProjectsSection({ projects, onAdd, onUpdate, onRemove }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-navy font-heading">Projects</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>
          <Plus size={16} />
          Add
        </Button>
      </div>
      {projects.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-body-sm text-text-muted mb-3">No projects added yet.</p>
          <Button variant="primary" size="sm" onClick={onAdd}>
            <Plus size={16} />
            Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj) => (
            <ProjectField key={proj.id} project={proj} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
        </div>
      )}
    </>
  )
}

/**
 * CVPreview - Live CV preview (right column)
 * Phase 3 (Week 5) will implement real template styling
 */
function CVPreview({ cvData, templateId }) {
  const { header, summary, experience, education, skills, projects } = cvData

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

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-body font-semibold text-navy font-heading uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">{exp.position}</span>
                  <span className="text-body-sm text-text-muted">{exp.duration}</span>
                </div>
                <p className="text-body-sm text-cyan">{exp.company}</p>
                {exp.description && (
                  <p className="text-body-sm text-text-primary mt-1">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-body font-semibold text-navy font-heading uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">{edu.degree}</span>
                  <span className="text-body-sm text-text-muted">{edu.year}</span>
                </div>
                <p className="text-body-sm text-cyan">{edu.school}</p>
                {edu.field && <p className="text-body-sm text-text-muted">{edu.field}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-body font-semibold text-navy font-heading uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-body-sm px-2 py-1 bg-navy/10 text-navy rounded font-semibold"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-body font-semibold text-navy font-heading uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">{proj.title}</span>
                  {proj.year && <span className="text-body-sm text-text-muted">{proj.year}</span>}
                </div>
                {proj.description && (
                  <p className="text-body-sm text-text-primary mt-1">{proj.description}</p>
                )}
                {proj.link && (
                  <p className="text-body-sm text-cyan hover:underline">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      View Project →
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!header.name && !summary.text && experience.length === 0 && education.length === 0 && skills.length === 0 && projects.length === 0 && (
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
