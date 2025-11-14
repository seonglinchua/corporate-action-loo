import { Badge } from '@/components/ui/badge'
import { getStatusColor } from '@/lib/mock-data'

interface StatusBadgeProps {
  status: string
  pulse?: boolean
}

export function StatusBadge({ status, pulse = false }: StatusBadgeProps) {
  const colorClass = getStatusColor(status)
  
  return (
    <Badge className={`${colorClass} ${pulse ? 'animate-pulse-slow' : ''}`}>
      {status}
    </Badge>
  )
}
