import { useRoute, Link } from 'wouter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, PencilSimple, ClockCounterClockwise } from '@phosphor-icons/react'
import { mockSecurities, mockCorporateActions, formatDate, getEventTypeLabel } from '@/lib/mock-data'
import { useKV } from '@github/spark/hooks'
import type { Security, CorporateAction } from '@/lib/types'

export function SecurityDetail() {
  const [, params] = useRoute('/securities/:id')
  const [securities] = useKV<Security[]>('securities', mockSecurities)
  const [corporateActions] = useKV<CorporateAction[]>('corporate-actions', mockCorporateActions)
  
  const security = (securities || []).find((s) => s.id === params?.id)
  const relatedActions = (corporateActions || []).filter((action) => action.securityId === params?.id)

  if (!security) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/securities">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Security not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isin = security.identifiers.find((id) => id.type === 'ISIN')
  const ric = security.identifiers.find((id) => id.type === 'RIC')
  const stockCode = security.identifiers.find((id) => id.type === 'stock_code')
  const cusip = security.identifiers.find((id) => id.type === 'CUSIP')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/securities">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{security.name}</h2>
            <p className="text-muted-foreground mt-1">{security.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ClockCounterClockwise size={18} />
            View History
          </Button>
          <Button className="gap-2">
            <PencilSimple size={18} />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Name</div>
              <div className="mt-1">{security.name}</div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Asset Class</div>
              <div className="mt-1 capitalize">{security.assetClass}</div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Exchange</div>
              <div className="mt-1">{security.exchange}</div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Currency</div>
              <div className="mt-1">{security.currency}</div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <div className="mt-1">
                <StatusBadge status={security.status} />
              </div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Created</div>
              <div className="mt-1 text-sm font-mono-numeric">{formatDate(security.createdAt)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
              <div className="mt-1 text-sm font-mono-numeric">{formatDate(security.updatedAt)}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Identifiers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isin && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">ISIN</div>
                    <div className="mt-1 text-lg font-mono-numeric font-semibold">{isin.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Valid from</div>
                    <div className="text-sm font-mono-numeric">{formatDate(isin.validFrom)}</div>
                  </div>
                </div>
              </div>
            )}

            {ric && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">RIC</div>
                    <div className="mt-1 text-lg font-mono-numeric font-semibold">{ric.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Valid from</div>
                    <div className="text-sm font-mono-numeric">{formatDate(ric.validFrom)}</div>
                  </div>
                </div>
              </div>
            )}

            {stockCode && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Stock Code</div>
                    <div className="mt-1 text-lg font-mono-numeric font-semibold">{stockCode.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Valid from</div>
                    <div className="text-sm font-mono-numeric">{formatDate(stockCode.validFrom)}</div>
                  </div>
                </div>
              </div>
            )}

            {cusip && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">CUSIP</div>
                    <div className="mt-1 text-lg font-mono-numeric font-semibold">{cusip.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Valid from</div>
                    <div className="text-sm font-mono-numeric">{formatDate(cusip.validFrom)}</div>
                  </div>
                </div>
              </div>
            )}

            {security.identifiers.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No identifiers found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Corporate Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {relatedActions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Ex-Date</TableHead>
                    <TableHead>Amount/Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatedActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">{getEventTypeLabel(action.eventType)}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{formatDate(action.exDate)}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">
                        {action.amount ? `${action.currency} ${action.amount}` : action.rate || '-'}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={action.status} />
                      </TableCell>
                      <TableCell>{action.source}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/events/${action.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No corporate actions found for this security.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
