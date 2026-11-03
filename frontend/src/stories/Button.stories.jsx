import { Button } from '../components/ui/Button'
import { Plus, Trash2, ArrowRight } from 'lucide-react'

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
}

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
}

export const Accent = {
  args: {
    variant: 'accent',
    children: 'Accent Cyan Action',
  },
}

export const Danger = {
  args: {
    variant: 'danger',
    children: 'Delete Project',
  },
}

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
  },
}

export const WithIcons = () => (
  <div className="flex gap-4 items-center">
    <Button leftIcon={<Plus size={18} />}>Create CV</Button>
    <Button variant="secondary" rightIcon={<ArrowRight size={18} />}>Continue</Button>
    <Button variant="danger" leftIcon={<Trash2 size={18} />}>Delete</Button>
  </div>
)

export const Loading = {
  args: {
    loading: true,
    loadingText: 'Saving changes...',
    children: 'Save Changes',
  },
}

export const Disabled = {
  args: {
    disabled: true,
    children: 'Unavailable Action',
  },
}
