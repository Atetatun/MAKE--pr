import { Link } from 'react-router-dom'
import { Plus, FileText, Clock, Download } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

/**
 * DashboardPage - My Projects
 *
 * Plan.md: /dashboard - My projects
 * PRD.md Section 4.5: Multiple project support (save multiple CVs)
 *
 * User Flow 2 (PRD.md):
 *   Dashboard → Select existing CV → CV Builder (edit mode) → Update → Save → Export
 */
export default function DashboardPage() {
  // TODO (Fahri): Load projects from Zustand store + API GET /cvs
  const projects = []

  return (
    <div className="page-container py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy font-heading mb-1">My Projects</h1>
          <p className="text-body text-text-muted font-body">
            Your saved CVs and portfolios.
          </p>
        </div>
        <Link to="/templates">
          <Button variant="primary">
            <Plus size={18} />
            New CV
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-24 px-6">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
        <FileText size={28} className="text-slate-400" />
      </div>
      <h2 className="text-h3 font-semibold text-navy font-heading mb-2">No projects yet</h2>
      <p className="text-body text-text-muted font-body mb-6 max-w-sm mx-auto">
        Create your first CV by picking a template from our gallery.
      </p>
      <Link to="/templates">
        <Button variant="primary">
          <Plus size={18} />
          Create Your First CV
        </Button>
      </Link>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      {/* Template color badge */}
      <div
        className="w-full h-24 rounded-lg mb-4 flex items-center justify-center"
        style={{ background: '#1e3a8a' }}
      >
        <FileText size={28} className="text-white/60" />
      </div>

      <h3 className="text-h3 font-semibold text-navy font-heading mb-1">{project.name}</h3>
      <div className="flex items-center gap-2 text-caption text-text-muted font-body mb-4">
        <Clock size={12} />
        Last edited {project.lastEdited}
      </div>

      <div className="flex items-center gap-3">
        <Link to={`/builder/${project.templateId}?cv=${project.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Edit
          </Button>
        </Link>
        <Button variant="ghost" size="sm" title="Download PDF">
          <Download size={16} />
        </Button>
      </div>
    </Card>
  )
}
