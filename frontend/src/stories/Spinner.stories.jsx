import { Spinner, LoadingState, Skeleton } from '../components/ui/Spinner'

export default {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
}

export const SpinnersAndLoaders = () => (
  <div className="flex flex-col gap-8 max-w-md">
    <div className="flex gap-4 items-center">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>

    <LoadingState text="Generating CV bullets with AI..." />

    <div className="flex flex-col gap-2 p-4 bg-white border rounded-lg">
      <h4 className="text-sm font-semibold text-text-primary mb-2">Skeleton Placeholder</h4>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  </div>
)
