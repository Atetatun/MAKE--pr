import { Link } from 'react-router-dom'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light px-6 text-center">
      <FileQuestion size={64} className="text-slate-300 mb-6" />
      <h1 className="text-4xl font-bold text-navy font-heading mb-3">Page Not Found</h1>
      <p className="text-body-lg text-text-muted font-body mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
