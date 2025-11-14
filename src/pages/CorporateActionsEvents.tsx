import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/StatusBadge'
import { MagnifyingGlass, Plus, Eye, PencilSimple, ArrowsDownUp } from '@phosphor-icons/react'
import { mockCorporateActions, formatDate, getEventTypeLabel } from '@/lib/mock-data'
import { Link } from 'wouter'
import { useKV } from '@github/spark/hooks'
import type { CorporateAction } from '@/lib/types'

export function CorporateActionsEvents() {
  const [events] = useKV<CorporateAction[]>('corporate-actions', mockCorporateActions)
  const [searchQuery, setSearchQuery] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEvents = (events || []).filter((event) => {
    const matchesSearch =
      searchQuery === '' ||
      event.securityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesEventType = eventTypeFilter === 'all' || event.eventType === eventTypeFilter
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter

    return matchesSearch && matchesEventType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Corporate Action Events</h2>
          <p className="text-muted-foreground mt-1">View and manage corporate action events</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Ingest Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by security name or event ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Event Types</SelectItem>
                <SelectItem value="dividend">Dividend</SelectItem>
                <SelectItem value="stock_split">Stock Split</SelectItem>
                <SelectItem value="merger">Merger</SelectItem>
                <SelectItem value="rights_offering">Rights Offering</SelectItem>
                <SelectItem value="spin_off">Spin-off</SelectItem>
                <SelectItem value="tender_offer">Tender Offer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="settled">Settled</SelectItem>
                <SelectItem value="voided">Voided</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchQuery || eventTypeFilter !== 'all' || statusFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredEvents.length} results
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setEventTypeFilter('all')
                  setStatusFilter('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
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
                  <TableHead>Event Type</TableHead>
                  <TableHead>Ex-Date</TableHead>
                  <TableHead>Amount/Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.securityName}</TableCell>
                    <TableCell>{getEventTypeLabel(event.eventType)}</TableCell>
                    <TableCell className="font-mono-numeric text-sm">{formatDate(event.exDate)}</TableCell>
                    <TableCell className="font-mono-numeric text-sm">
                      {event.amount ? `${event.currency} ${event.amount}` : event.rate || '-'}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={event.status} />
                    </TableCell>
                    <TableCell>{event.source}</TableCell>
                    <TableCell className="font-mono-numeric text-sm">{formatDate(event.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye size={16} />
                            View
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <PencilSimple size={16} />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No events found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
