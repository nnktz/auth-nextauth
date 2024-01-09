import { poppins } from '@/lib/font'
import { cn } from '@/lib/utils'

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn('text-3xl font-semibold', poppins.className)}>🔐 Auth</h1>

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
