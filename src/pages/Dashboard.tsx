import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/MetricCard'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Database,
  IdentificationCard,
  CalendarCheck,
  ChartLineUp,
  MagnifyingGlass,
  Plus,
  Scales,
  Check,
  X,
  Warning,
} from '@phosphor-icons/react'
import { mockSystemHealth, mockDashboardMetrics, mockActivityFeed, getRelativeTime } from '@/lib/mock-data'
import { Link } from 'wouter'

export function Dashboard() {
  const health = mockSystemHealth
  const metrics = mockDashboardMetrics
  const activities = mockActivityFeed

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">System overview and quick actions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lookup Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatusBadge status={health.lookupEngine} pulse={health.lookupEngine === 'operational'} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Database Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold font-mono-numeric">{health.databaseResponseTime}ms</div>
            <p className="text-xs text-muted-foreground mt-1">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cache Hit Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold font-mono-numeric">{health.cacheHitRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Data Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{getRelativeTime(health.lastDataSync)}</div>
            <p className="text-xs text-muted-foreground mt-1">All sources synchronized</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Today's Activity</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Actions Processed"
            value={metrics.actionsProcessed}
            icon={<CalendarCheck size={20} />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Failed Lookups"
            value={metrics.failedLookups}
            icon={<MagnifyingGlass size={20} />}
            subtitle="0.02% failure rate"
          />
          <MetricCard
            title="Unresolved Conflicts"
            value={metrics.unresolvedConflicts}
            icon={<Scales size={20} />}
          />
          <MetricCard
            title="Ingestion Rate"
            value={`${metrics.ingestionRate}/hr`}
            icon={<ChartLineUp size={20} />}
            subtitle="Events per hour"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Securities in Registry"
          value={metrics.securitiesCount.toLocaleString()}
          icon={<Database size={20} />}
        />
        <MetricCard
          title="Identifier Mappings"
          value={metrics.identifierMappings.toLocaleString()}
          icon={<IdentificationCard size={20} />}
        />
        <MetricCard
          title="Active Corporate Actions"
          value={metrics.activeActions}
          icon={<CalendarCheck size={20} />}
        />
        <MetricCard
          title="API Calls (24h)"
          value={metrics.apiCalls24h.toLocaleString()}
          icon={<ChartLineUp size={20} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    {activity.status === 'success' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                        <Check size={16} className="text-success" weight="bold" />
                      </div>
                    )}
                    {activity.status === 'failure' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                        <X size={16} className="text-destructive" weight="bold" />
                      </div>
                    )}
                    {activity.status === 'warning' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                        <Warning size={16} className="text-yellow-600" weight="bold" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    {activity.details && (
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{getRelativeTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/lookup">
              <Button className="w-full justify-start gap-2" variant="outline">
                <MagnifyingGlass size={18} />
                Resolve Identifier
              </Button>
            </Link>
            <Link href="/events">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Plus size={18} />
                Ingest Corporate Action
              </Button>
            </Link>
            <Link href="/conflicts">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Scales size={18} />
                View Conflicts
                {metrics.unresolvedConflicts > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {metrics.unresolvedConflicts}
                  </span>
                )}
              </Button>
            </Link>
            <Separator />
            <Link href="/securities">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Database size={18} />
                Search Securities
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
