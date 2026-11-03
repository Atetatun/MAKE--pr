import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export const StandardCard = () => (
  <div className="max-w-md">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Professional Template</CardTitle>
          <Badge variant="success">ATS 98%</Badge>
        </div>
        <CardDescription>Single-column chronological layout with crisp dividers</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-text-muted">
          Recommended for Corporate, Finance, Law, and Traditional engineering roles.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary" size="sm">Preview</Button>
        <Button size="sm">Use Template</Button>
      </CardFooter>
    </Card>
  </div>
)

export const InteractiveCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
    <Card interactive onClick={() => alert('Selected Professional')}>
      <CardTitle>Professional</CardTitle>
      <CardDescription>Hover over me to see the 1.05x scale and shadow effect!</CardDescription>
    </Card>
    <Card interactive onClick={() => alert('Selected Creative')}>
      <CardTitle>Creative</CardTitle>
      <CardDescription>Press Tab to focus me, then Enter or Space to activate!</CardDescription>
    </Card>
  </div>
)
