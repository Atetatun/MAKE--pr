import { Badge } from '../components/ui/Badge'
import { Check, AlertTriangle, Sparkles } from 'lucide-react'

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export const AllVariants = () => (
  <div className="flex flex-wrap gap-3 items-center">
    <Badge variant="primary">Navy Tag</Badge>
    <Badge variant="cyan">Cyan Skill</Badge>
    <Badge variant="orange">Orange Warning</Badge>
    <Badge variant="success" dot icon={<Check size={14} />}>ATS Score: 98%</Badge>
    <Badge variant="warning" dot icon={<AlertTriangle size={14} />}>ATS Score: 74%</Badge>
    <Badge variant="error" dot>Format Issue</Badge>
    <Badge variant="neutral">Neutral Slate</Badge>
    <Badge variant="cyan" icon={<Sparkles size={14} />}>AI Suggested</Badge>
  </div>
)
