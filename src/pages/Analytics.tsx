import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/MetricCard'
import { ChartLineUp, MagnifyingGlass, Check, X, ClockCounterClockwise } from '@phosphor-icons/react'

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Reporting & Analytics</h2>
        <p className="text-muted-foreground mt-1">System metrics and data quality insights</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Lookup Success Rate"
            value="99.8%"
            icon={<Check size={20} />}
            trend={{ value: 0.2, isPositive: true }}
            subtitle="Last 24 hours"
          />
          <MetricCard
            title="Average Lookup Latency"
            value="145ms"
            icon={<ClockCounterClockwise size={20} />}
            subtitle="p50: 120ms, p95: 280ms"
          />
          <MetricCard
            title="Unresolved Identifiers"
            value="23"
            icon={<X size={20} />}
            subtitle="Requires attention"
          />
          <MetricCard
            title="Data Quality Score"
            value="96.5%"
            icon={<ChartLineUp size={20} />}
            trend={{ value: 1.2, isPositive: true }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lookup Volume (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Time series chart placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Corporate Actions by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dividend</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '65%' }} />
                  </div>
                  <span className="text-sm font-mono-numeric text-muted-foreground">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stock Split</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-mono-numeric text-muted-foreground">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Merger</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '10%' }} />
                  </div>
                  <span className="text-sm font-mono-numeric text-muted-foreground">10%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Other</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-muted-foreground" style={{ width: '5%' }} />
                  </div>
                  <span className="text-sm font-mono-numeric text-muted-foreground">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Looked-Up Securities (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'DBS Group Holdings Limited', count: 1523 },
              { name: 'OCBC Bank', count: 1234 },
              { name: 'United Overseas Bank', count: 987 },
              { name: 'Singapore Airlines', count: 856 },
              { name: 'Singtel', count: 745 },
            ].map((security, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium">{idx + 1}. {security.name}</div>
                </div>
                <div className="font-mono-numeric text-sm text-muted-foreground">
                  {security.count.toLocaleString()} lookups
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
