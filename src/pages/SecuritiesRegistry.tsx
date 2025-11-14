import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/StatusBadge'
import { MagnifyingGlass, Funnel, Eye, PencilSimple, ArrowsDownUp, Upload, Download } from '@phosphor-icons/react'
import { mockSecurities, formatDate } from '@/lib/mock-data'
import { Link } from 'wouter'
import { useKV } from '@github/spark/hooks'
import type { Security } from '@/lib/types'

export function SecuritiesRegistry() {
  const [securities] = useKV<Security[]>('securities', mockSecurities)
  const [searchQuery, setSearchQuery] = useState('')
  const [assetClassFilter, setAssetClassFilter] = useState('all')
  const [exchangeFilter, setExchangeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredSecurities = (securities || []).filter((security) => {
    const matchesSearch = 
      searchQuery === '' ||
      security.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      security.identifiers.some((id) => id.value.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesAssetClass = assetClassFilter === 'all' || security.assetClass === assetClassFilter
    const matchesExchange = exchangeFilter === 'all' || security.exchange === exchangeFilter
    const matchesStatus = statusFilter === 'all' || security.status === statusFilter

    return matchesSearch && matchesAssetClass && matchesExchange && matchesStatus
  })

  const exchanges = Array.from(new Set((securities || []).map((s) => s.exchange)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Securities Master Registry</h2>
          <p className="text-muted-foreground mt-1">Browse and manage securities database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload size={18} />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by name, ISIN, RIC, stock code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={assetClassFilter} onValueChange={setAssetClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Asset Classes</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="bond">Bond</SelectItem>
                <SelectItem value="fund">Fund</SelectItem>
                <SelectItem value="derivative">Derivative</SelectItem>
              </SelectContent>
            </Select>

            <Select value={exchangeFilter} onValueChange={setExchangeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Exchange" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exchanges</SelectItem>
                {exchanges.map((exchange) => (
                  <SelectItem key={exchange} value={exchange}>{exchange}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchQuery || assetClassFilter !== 'all' || exchangeFilter !== 'all' || statusFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredSecurities.length} results
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setAssetClassFilter('all')
                  setExchangeFilter('all')
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
                      Security Name
                      <ArrowsDownUp size={14} />
                    </Button>
                  </TableHead>
                  <TableHead>ISIN</TableHead>
                  <TableHead>RIC</TableHead>
                  <TableHead>Stock Code</TableHead>
                  <TableHead>Exchange</TableHead>
                  <TableHead>Asset Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSecurities.map((security) => {
                  const isin = security.identifiers.find((id) => id.type === 'ISIN')
                  const ric = security.identifiers.find((id) => id.type === 'RIC')
                  const stockCode = security.identifiers.find((id) => id.type === 'stock_code')

                  return (
                    <TableRow key={security.id}>
                      <TableCell className="font-medium">{security.name}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{isin?.value || '-'}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{ric?.value || '-'}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{stockCode?.value || '-'}</TableCell>
                      <TableCell>{security.exchange}</TableCell>
                      <TableCell className="capitalize">{security.assetClass}</TableCell>
                      <TableCell>
                        <StatusBadge status={security.status} />
                      </TableCell>
                      <TableCell className="font-mono-numeric text-sm">{formatDate(security.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/securities/${security.id}`}>
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
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredSecurities.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No securities found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
