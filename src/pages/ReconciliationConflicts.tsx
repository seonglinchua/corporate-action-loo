import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Eye, ArrowsDownUp, Warning } from '@phosphor-icons/react'
import { mockConflicts, formatDate, getEventTypeLabel } from '@/lib/mock-data'
import { Link } from 'wouter'
import { useKV } from '@github/spark/hooks'
import type { Conflict } from '@/lib/types'

export function ReconciliationConflicts() {
  const [conflicts] = useKV<Conflict[]>('conflicts', mockConflicts)
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredConflicts = (conflicts || []).filter((conflict) => {
    return statusFilter === 'all' || conflict.status === statusFilter
  })

  const unresolvedCount = (conflicts || []).filter((c) => c.status === 'unresolved').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Reconciliation & Conflicts</h2>
          <p className="text-muted-foreground mt-1">Review and resolve data conflicts</p>
        </div>
        {unresolvedCount > 0 && (
          <Badge variant="destructive" className="gap-2">
            <Warning size={16} weight="bold" />
            {unresolvedCount} Unresolved
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {statusFilter !== 'all' && (
              <Button variant="ghost" size="sm" onClick={() => setStatusFilter('all')}>
                Clear filter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="gap-1 -ml-4">
                      Security
                      <ArrowsDownUp size={14} />
                    </Button>
                  </TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Sources</TableHead>
                  <TableHead>Conflict Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConflicts.map((conflict) => (
                  <TableRow key={conflict.id}>
                    <TableCell className="font-medium">{conflict.securityName}</TableCell>
                    <TableCell>{getEventTypeLabel(conflict.eventType)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {conflict.sources.map((source, idx) => (
                          <span key={idx} className="text-xs">
                            {source.source}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{conflict.conflictType.replace('_', ' ')}</TableCell>
                    <TableCell className="text-sm">{conflict.details}</TableCell>
                    <TableCell>
                      <StatusBadge status={conflict.status} />
                    </TableCell>
                    <TableCell className="font-mono-numeric text-sm">{formatDate(conflict.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/conflicts/${conflict.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye size={16} />
                          {conflict.status === 'unresolved' ? 'Resolve' : 'View'}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredConflicts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No conflicts found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
