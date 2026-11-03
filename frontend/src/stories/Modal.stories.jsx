import { useState } from 'react'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { FormField, Input } from '../components/ui/Input'

export default {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [size, setSize] = useState('default')

  return (
    <div>
      <div className="flex gap-3">
        <Button onClick={() => { setSize('default'); setIsOpen(true) }}>Open Default Modal</Button>
        <Button variant="accent" onClick={() => { setSize('lg'); setIsOpen(true) }}>Open AI Modal (Large)</Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={size === 'lg' ? 'AI Auto-Write CV Assistant' : 'Confirm Action'}
        description={size === 'lg' ? 'Provide a job title or bullet point to generate ATS-friendly text.' : 'Are you sure you want to proceed with this update?'}
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm & Save</Button>
          </>
        }
      >
        <div className="py-2 flex flex-col gap-4">
          <FormField label="Target Job Title">
            <Input placeholder="e.g. Full Stack Developer" />
          </FormField>
          <p className="text-sm text-text-muted">
            Focus trap test: Try pressing Tab and Shift+Tab. Notice how focus remains trapped inside the modal, and pressing Escape closes it!
          </p>
        </div>
      </Modal>
    </div>
  )
}
