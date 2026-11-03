import { useState } from 'react'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import { FileText, Layout, Sparkles, CheckCircle } from 'lucide-react'

export default {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

const TABS = [
  { id: 'content', label: 'Content Editor', count: 5, icon: <FileText size={16} /> },
  { id: 'templates', label: 'Template Gallery', count: 3, icon: <Layout size={16} /> },
  { id: 'ai', label: 'AI Auto-Write', icon: <Sparkles size={16} /> },
  { id: 'ats', label: 'ATS Score', count: 94, icon: <CheckCircle size={16} /> },
]

export const Interactive = () => {
  const [activeTab, setActiveTab] = useState('content')

  return (
    <div className="max-w-2xl">
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="p-4 bg-white rounded-b-lg border border-t-0 border-slate-200">
        <TabPanel id="content" activeTab={activeTab}>
          <h4 className="font-bold text-navy text-lg">Content Editor Tab</h4>
          <p className="text-sm text-text-muted mt-1">Manage personal details, experience, education, and skills.</p>
        </TabPanel>
        <TabPanel id="templates" activeTab={activeTab}>
          <h4 className="font-bold text-navy text-lg">Template Gallery Tab</h4>
          <p className="text-sm text-text-muted mt-1">Switch between Professional, Creative, and Minimal templates.</p>
        </TabPanel>
        <TabPanel id="ai" activeTab={activeTab}>
          <h4 className="font-bold text-navy text-lg">AI Assistant Tab</h4>
          <p className="text-sm text-text-muted mt-1">Generate high-impact action bullets tailored for ATS scanners.</p>
        </TabPanel>
        <TabPanel id="ats" activeTab={activeTab}>
          <h4 className="font-bold text-navy text-lg">ATS Score Analysis</h4>
          <p className="text-sm text-text-muted mt-1">Current compliance: 94% (Excellent).</p>
        </TabPanel>
      </div>
    </div>
  )
}
