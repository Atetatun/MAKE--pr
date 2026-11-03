import { useState } from 'react'
import { Input, Textarea, Select, FormField, Checkbox, Toggle } from '../components/ui/Input'
import { Search, Mail } from 'lucide-react'

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    placeholder: 'Enter full name...',
  },
}

export const WithIcons = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Input leftIcon={<Search size={18} />} placeholder="Search templates..." />
    <Input leftIcon={<Mail size={18} />} placeholder="alexander@portcraft.dev" />
  </div>
)

export const ErrorState = {
  args: {
    error: true,
    defaultValue: 'invalid-email-address',
  },
}

export const FormFieldExample = () => {
  const [val, setVal] = useState('')
  return (
    <div className="max-w-md flex flex-col gap-5">
      <FormField label="Full Name" required hint="As it will appear on your CV header">
        <Input placeholder="e.g. Alexander Pratama" value={val} onChange={(e) => setVal(e.target.value)} />
      </FormField>

      <FormField label="Email Address" required error="Please enter a valid email address (e.g. name@domain.com)">
        <Input defaultValue="wrong-email" />
      </FormField>

      <FormField label="Professional Summary" hint="Write 2-4 sentences highlighting your background">
        <Textarea placeholder="Senior Software Engineer with 5+ years of experience..." />
      </FormField>

      <FormField label="Template Category">
        <Select defaultValue="creative">
          <option value="professional">Professional Chronological</option>
          <option value="creative">Creative Modern</option>
          <option value="minimal">Minimalist Swiss</option>
        </Select>
      </FormField>
    </div>
  )
}

export const CheckboxAndToggle = () => {
  const [checked, setChecked] = useState(true)
  const [toggle, setToggle] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Include ATS optimization tips" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <Checkbox label="Disabled option" disabled />
      <Toggle label="Enable AI Auto-Write Assistant" checked={toggle} onChange={setToggle} />
    </div>
  )
}
