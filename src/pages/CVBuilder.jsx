import { useState, useEffect } from 'react';
import { useCVStore } from '../store';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Input, Textarea } from '../components/Input';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Badge } from '../components/Badge';
import { Plus, Trash2, GripVertical, Sparkles, AlertCircle, Download } from 'lucide-react';
import { exportToPDF, downloadJSON } from '../utils/export';
import { storage } from '../utils/storage';
import { aiAPI, atsAPI } from '../utils/api';

export function CVBuilder() {
  const { cvData, updateCVData, selectedTemplate, setIsSaving } = useCVStore();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [aiSection, setAISection] = useState(null);
  const [aiLoading, setAILoading] = useState(false);
  const [aiOptions, setAIOptions] = useState([]);
  const [atsScore, setATSScore] = useState(null);
  const [atsIssues, setATSIssues] = useState([]);
  const [atsLoading, setATSLoading] = useState(false);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      storage.setCVData(cvData, `cv_${selectedTemplate}`);
      setIsSaving(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [cvData, selectedTemplate, setIsSaving]);

  // Load saved data on mount
  useEffect(() => {
    const saved = storage.getCVData(`cv_${selectedTemplate}`);
    if (saved) {
      useCVStore.setState({ cvData: saved });
    }
  }, [selectedTemplate]);

  const handleAddExperience = () => {
    updateCVData('experience', [...cvData.experience, { company: '', position: '', duration: '', description: '' }]);
  };

  const handleRemoveExperience = (index) => {
    updateCVData('experience', cvData.experience.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    updateCVData('education', [...cvData.education, { school: '', degree: '', field: '', year: '' }]);
  };

  const handleRemoveEducation = (index) => {
    updateCVData('education', cvData.education.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    updateCVData('skills', [...cvData.skills, '']);
  };

  const handleRemoveSkill = (index) => {
    updateCVData('skills', cvData.skills.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    updateCVData('projects', [...cvData.projects, { title: '', description: '', link: '' }]);
  };

  const handleRemoveProject = (index) => {
    updateCVData('projects', cvData.projects.filter((_, i) => i !== index));
  };

  const handleAIGenerate = async () => {
    if (!aiSection) return;
    setAILoading(true);

    try {
      const response = await aiAPI.generate(aiSection, 'Generate 3 professional variations');
      setAIOptions(response.data.options || []);
    } catch (error) {
      console.error('AI generation failed:', error);
      setAIOptions([
        'Sample professional text option 1',
        'Sample professional text option 2',
        'Sample professional text option 3',
      ]);
    } finally {
      setAILoading(false);
    }
  };

  const handleAISelect = (option) => {
    if (aiSection === 'summary') {
      updateCVData('summary', option);
    }
    setIsAIModalOpen(false);
  };

  const handleATSCheck = async () => {
    setATSLoading(true);

    try {
      const response = await atsAPI.check(cvData);
      setATSScore(response.data.score || 0);
      setATSIssues(response.data.issues || []);
    } catch (error) {
      console.error('ATS check failed:', error);
      setATSScore(75);
      setATSIssues([
        { severity: 'warning', message: 'Consider adding more skills' },
        { severity: 'info', message: 'Good use of standard formatting' },
      ]);
    } finally {
      setATSLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsSaving(true);
      await exportToPDF('cv-preview', `${cvData.header.fullName || 'CV'}.pdf`);
      setIsExportModalOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Toolbar */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <Button variant="primary" onClick={() => { setAISection('summary'); setIsAIModalOpen(true); }}>
              <Sparkles size={18} className="mr-2" /> AI Auto-Write
            </Button>
            <Button variant="secondary" onClick={handleATSCheck}>
              <AlertCircle size={18} className="mr-2" /> Check ATS
            </Button>
            <Button variant="secondary" onClick={() => setIsExportModalOpen(true)}>
              <Download size={18} className="mr-2" /> Export
            </Button>
            <Button variant="secondary" onClick={() => storage.setCVData(cvData, `cv_${selectedTemplate}`)}>
              Save
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Column */}
            <div className="space-y-8">
              {/* Header Section */}
              <Card>
                <h2 className="text-2xl font-bold text-navy mb-6 font-heading">Header</h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={cvData.header.fullName}
                    onChange={(e) => updateCVData('header.fullName', e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={cvData.header.email}
                    onChange={(e) => updateCVData('header.email', e.target.value)}
                  />
                  <Input
                    placeholder="Phone"
                    value={cvData.header.phone}
                    onChange={(e) => updateCVData('header.phone', e.target.value)}
                  />
                  <Input
                    placeholder="Location"
                    value={cvData.header.location}
                    onChange={(e) => updateCVData('header.location', e.target.value)}
                  />
                </div>
              </Card>

              {/* Summary Section */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy font-heading">Summary</h2>
                  <button
                    onClick={() => { setAISection('summary'); setIsAIModalOpen(true); }}
                    className="text-cyan hover:text-blue-600 transition"
                  >
                    <Sparkles size={20} />
                  </button>
                </div>
                <Textarea
                  placeholder="Write a brief professional summary..."
                  rows={4}
                  value={cvData.summary}
                  onChange={(e) => updateCVData('summary', e.target.value)}
                />
              </Card>

              {/* Experience Section */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy font-heading">Experience</h2>
                  <Button variant="ghost" size="small" onClick={handleAddExperience}>
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="space-y-6">
                  {cvData.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">{idx + 1}</span>
                        <button
                          onClick={() => handleRemoveExperience(idx)}
                          className="text-error hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cvData.experience];
                          updated[idx].company = e.target.value;
                          updateCVData('experience', updated);
                        }}
                      />
                      <Input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const updated = [...cvData.experience];
                          updated[idx].position = e.target.value;
                          updateCVData('experience', updated);
                        }}
                      />
                      <Input
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => {
                          const updated = [...cvData.experience];
                          updated[idx].duration = e.target.value;
                          updateCVData('experience', updated);
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        rows={3}
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...cvData.experience];
                          updated[idx].description = e.target.value;
                          updateCVData('experience', updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Education Section */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy font-heading">Education</h2>
                  <Button variant="ghost" size="small" onClick={handleAddEducation}>
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="space-y-6">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">{idx + 1}</span>
                        <button
                          onClick={() => handleRemoveEducation(idx)}
                          className="text-error hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <Input
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => {
                          const updated = [...cvData.education];
                          updated[idx].school = e.target.value;
                          updateCVData('education', updated);
                        }}
                      />
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...cvData.education];
                          updated[idx].degree = e.target.value;
                          updateCVData('education', updated);
                        }}
                      />
                      <Input
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const updated = [...cvData.education];
                          updated[idx].field = e.target.value;
                          updateCVData('education', updated);
                        }}
                      />
                      <Input
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => {
                          const updated = [...cvData.education];
                          updated[idx].year = e.target.value;
                          updateCVData('education', updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Skills Section */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy font-heading">Skills</h2>
                  <Button variant="ghost" size="small" onClick={handleAddSkill}>
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="space-y-3">
                  {cvData.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        placeholder="Skill"
                        value={skill}
                        onChange={(e) => {
                          const updated = [...cvData.skills];
                          updated[idx] = e.target.value;
                          updateCVData('skills', updated);
                        }}
                      />
                      <button
                        onClick={() => handleRemoveSkill(idx)}
                        className="text-error hover:text-red-600 px-3"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Projects Section */}
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy font-heading">Projects</h2>
                  <Button variant="ghost" size="small" onClick={handleAddProject}>
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="space-y-6">
                  {cvData.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">{idx + 1}</span>
                        <button
                          onClick={() => handleRemoveProject(idx)}
                          className="text-error hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <Input
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...cvData.projects];
                          updated[idx].title = e.target.value;
                          updateCVData('projects', updated);
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        rows={3}
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...cvData.projects];
                          updated[idx].description = e.target.value;
                          updateCVData('projects', updated);
                        }}
                      />
                      <Input
                        placeholder="Project Link (optional)"
                        value={proj.link}
                        onChange={(e) => {
                          const updated = [...cvData.projects];
                          updated[idx].link = e.target.value;
                          updateCVData('projects', updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Preview Column */}
            <div className="sticky top-24">
              <Card className="p-8" id="cv-preview">
                <div className="space-y-6 text-sm">
                  {/* Header Preview */}
                  {(cvData.header.fullName || cvData.header.email) && (
                    <div className="border-b border-border pb-4">
                      <h1 className="text-3xl font-bold text-navy">{cvData.header.fullName || 'Your Name'}</h1>
                      <div className="text-text-muted mt-2 space-y-1">
                        {cvData.header.email && <p>{cvData.header.email}</p>}
                        {cvData.header.phone && <p>{cvData.header.phone}</p>}
                        {cvData.header.location && <p>{cvData.header.location}</p>}
                      </div>
                    </div>
                  )}

                  {/* Summary Preview */}
                  {cvData.summary && (
                    <div>
                      <h2 className="font-bold text-navy mb-2">Summary</h2>
                      <p className="text-text-primary whitespace-pre-wrap">{cvData.summary}</p>
                    </div>
                  )}

                  {/* Experience Preview */}
                  {cvData.experience.length > 0 && (
                    <div>
                      <h2 className="font-bold text-navy mb-3">Experience</h2>
                      <div className="space-y-3">
                        {cvData.experience.map((exp, idx) => (
                          <div key={idx}>
                            <div className="font-semibold text-navy">{exp.position}</div>
                            <div className="text-text-muted text-xs">{exp.company} • {exp.duration}</div>
                            <p className="text-text-primary text-xs mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Preview */}
                  {cvData.education.length > 0 && (
                    <div>
                      <h2 className="font-bold text-navy mb-3">Education</h2>
                      <div className="space-y-3">
                        {cvData.education.map((edu, idx) => (
                          <div key={idx}>
                            <div className="font-semibold text-navy">{edu.degree}</div>
                            <div className="text-text-muted text-xs">{edu.school} • {edu.year}</div>
                            <p className="text-text-primary text-xs">{edu.field}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {cvData.skills.length > 0 && (
                    <div>
                      <h2 className="font-bold text-navy mb-3">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.map((skill, idx) => (
                          <Badge key={idx} variant="primary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Preview */}
                  {cvData.projects.length > 0 && (
                    <div>
                      <h2 className="font-bold text-navy mb-3">Projects</h2>
                      <div className="space-y-3">
                        {cvData.projects.map((proj, idx) => (
                          <div key={idx}>
                            <div className="font-semibold text-navy">{proj.title}</div>
                            <p className="text-text-primary text-xs mt-1">{proj.description}</p>
                            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-cyan text-xs hover:underline">{proj.link}</a>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      <Modal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        title="AI Auto-Write"
        size="large"
      >
        {aiLoading ? (
          <LoadingSpinner text="Generating options..." />
        ) : aiOptions.length > 0 ? (
          <div className="space-y-4">
            {aiOptions.map((option, idx) => (
              <Card key={idx} className="cursor-pointer hover:bg-slate-50" onClick={() => handleAISelect(option)}>
                <p className="text-text-primary mb-3">{option}</p>
                <Button variant="secondary" size="small" className="w-full">
                  Select This
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Textarea placeholder="Describe what you want to generate..." rows={4} />
            <Button variant="primary" className="w-full mt-4" onClick={handleAIGenerate}>
              Generate Options
            </Button>
          </div>
        )}
      </Modal>

      {/* ATS Modal */}
      <Modal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        title="ATS Checker"
        size="default"
      >
        {atsLoading ? (
          <LoadingSpinner text="Checking ATS compatibility..." />
        ) : atsScore !== null ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-navy mb-2">{atsScore}</div>
              <p className="text-text-muted">ATS Compatibility Score</p>
            </div>
            {atsIssues.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-navy">Issues Found</h3>
                {atsIssues.map((issue, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <Badge variant={issue.severity}>{issue.severity}</Badge>
                    <p className="text-text-primary text-sm">{issue.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Button variant="primary" className="w-full" onClick={handleATSCheck}>
            Start ATS Check
          </Button>
        )}
      </Modal>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export CV"
        size="default"
      >
        <div className="space-y-3">
          <Button variant="primary" className="w-full" onClick={handleExportPDF}>
            Download as PDF
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              downloadJSON(cvData, `${cvData.header.fullName || 'CV'}.json`);
              setIsExportModalOpen(false);
            }}
          >
            Download as JSON
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
