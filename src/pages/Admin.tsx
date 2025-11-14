import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { StatusBadge } from '@/components/StatusBadge'
import { PencilSimple, UserPlus, Download } from '@phosphor-icons/react'
import { mockUsers, formatDate } from '@/lib/mock-data'
import { useKV } from '@github/spark/hooks'
import type { User } from '@/lib/types'

export function Admin() {
  const [users] = useKV<User[]>('users', mockUsers)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Admin & Settings</h2>
        <p className="text-muted-foreground mt-1">System configuration and access control</p>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">Cache TTL (minutes)</Label>
                  <Input id="cache-ttl" type="number" defaultValue={30} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-lookups">Max Concurrent Lookups</Label>
                  <Input id="max-lookups" type="number" defaultValue={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lookup-timeout">Lookup Timeout (seconds)</Label>
                  <Input id="lookup-timeout" type="number" defaultValue={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Data Retention Period (days)</Label>
                  <Input id="retention" type="number" defaultValue={365} />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alert-conflicts">Alert on reconciliation conflicts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when conflicts are detected</p>
                </div>
                <Switch id="alert-conflicts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alert-sync">Alert on sync failures</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when data sync fails</p>
                </div>
                <Switch id="alert-sync" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-severity">Alert Severity Level</Label>
                <Select defaultValue="warning">
                  <SelectTrigger id="alert-severity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="warning">Warning & Above</SelectItem>
                    <SelectItem value="error">Error Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Users</CardTitle>
                <Button className="gap-2">
                  <UserPlus size={18} />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(users || []).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm">{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role.replace('_', ' ')}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="font-mono-numeric text-sm">{formatDate(user.lastLogin)}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <PencilSimple size={16} />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Disable
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium">Role</th>
                      <th className="text-center py-3 px-4 text-sm font-medium">Lookup</th>
                      <th className="text-center py-3 px-4 text-sm font-medium">View Events</th>
                      <th className="text-center py-3 px-4 text-sm font-medium">Ingest Events</th>
                      <th className="text-center py-3 px-4 text-sm font-medium">Resolve Conflicts</th>
                      <th className="text-center py-3 px-4 text-sm font-medium">Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4 font-medium">Analyst</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✗</td>
                      <td className="py-3 px-4 text-center">✗</td>
                      <td className="py-3 px-4 text-center">✗</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Senior Analyst</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✗</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Admin</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                      <td className="py-3 px-4 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Master Registry Backup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Last Backup</div>
                  <div className="mt-1 font-mono-numeric">2024-11-07 02:00:00</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Backup Frequency</div>
                  <div className="mt-1">Daily at 2:00 AM</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download size={18} />
                  Download Backup
                </Button>
                <Button variant="outline">Restore from Backup</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Cleanup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Delete Inactive Securities
                </Button>
                <p className="text-xs text-muted-foreground">
                  Soft delete securities marked as inactive for more than 90 days
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Archive Old Events (&gt;365 days)
                </Button>
                <p className="text-xs text-muted-foreground">
                  Move settled corporate actions older than 1 year to archive
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Purge Audit Logs (&gt;730 days)
                </Button>
                <p className="text-xs text-muted-foreground">
                  Permanently delete audit logs older than 2 years
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
