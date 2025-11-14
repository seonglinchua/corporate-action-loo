import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { CloudArrowDown, ArrowClockwise } from '@phosphor-icons/react'
import { mockDataSources, formatDateTime } from '@/lib/mock-data'
import { useKV } from '@github/spark/hooks'
import type { DataSourceStatus } from '@/lib/types'

export function DataSources() {
  const [dataSources] = useKV<DataSourceStatus[]>('data-sources', mockDataSources)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Data Sync & Sources</h2>
        <p className="text-muted-foreground mt-1">Manage data ingestion from external sources</p>
      </div>

      <div className="grid gap-6">
        {(dataSources || []).map((source) => (
          <Card key={source.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CloudArrowDown size={24} className="text-primary" />
                  <div>
                    <CardTitle>{source.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sync Frequency: {source.syncFrequency}
                    </p>
                  </div>
                </div>
                <StatusBadge status={source.status} pulse={source.status === 'connected'} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Last Sync</div>
                  <div className="mt-1 font-mono-numeric text-sm">{formatDateTime(source.lastSync)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Records Synced (24h)</div>
                  <div className="mt-1 font-mono-numeric text-lg font-semibold">
                    {source.recordsSynced24h.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Next Sync</div>
                  <div className="mt-1 font-mono-numeric text-sm">
                    {source.nextSync ? formatDateTime(source.nextSync) : 'N/A'}
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowClockwise size={16} />
                    Manual Sync
                  </Button>
                  <Button variant="outline" size="sm">
                    View Logs
                  </Button>
                </div>
              </div>
              {source.errorMessage && (
                <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {source.errorMessage}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
