import type {
  Security,
  CorporateAction,
  Conflict,
  DataSourceStatus,
  SystemHealth,
  DashboardMetrics,
  ActivityFeed,
  User,
  AuditLog,
} from './types'

export const mockSecurities: Security[] = [
  {
    id: 'DBS-SG',
    name: 'DBS Group Holdings Limited',
    assetClass: 'equity',
    exchange: 'SGX',
    currency: 'SGD',
    status: 'active',
    identifiers: [
      { type: 'ISIN', value: 'SG9999009436', validFrom: '2010-01-01' },
      { type: 'RIC', value: 'DBSM.SI', validFrom: '2010-01-01' },
      { type: 'stock_code', value: 'D05', validFrom: '2010-01-01' },
    ],
    createdAt: '2010-01-01T00:00:00Z',
    updatedAt: '2024-11-07T14:30:00Z',
  },
  {
    id: 'OCBC-SG',
    name: 'Oversea-Chinese Banking Corporation',
    assetClass: 'equity',
    exchange: 'SGX',
    currency: 'SGD',
    status: 'active',
    identifiers: [
      { type: 'ISIN', value: 'SG1S04926220', validFrom: '2010-01-01' },
      { type: 'RIC', value: 'OCBC.SI', validFrom: '2010-01-01' },
      { type: 'stock_code', value: 'O39', validFrom: '2010-01-01' },
    ],
    createdAt: '2010-01-01T00:00:00Z',
    updatedAt: '2024-11-06T10:15:00Z',
  },
  {
    id: 'UOB-SG',
    name: 'United Overseas Bank Limited',
    assetClass: 'equity',
    exchange: 'SGX',
    currency: 'SGD',
    status: 'active',
    identifiers: [
      { type: 'ISIN', value: 'SG1M31001969', validFrom: '2010-01-01' },
      { type: 'RIC', value: 'UOBH.SI', validFrom: '2010-01-01' },
      { type: 'stock_code', value: 'U11', validFrom: '2010-01-01' },
    ],
    createdAt: '2010-01-01T00:00:00Z',
    updatedAt: '2024-11-05T16:45:00Z',
  },
  {
    id: 'MAYBANK-MY',
    name: 'Malayan Banking Berhad',
    assetClass: 'equity',
    exchange: 'Bursa',
    currency: 'MYR',
    status: 'active',
    identifiers: [
      { type: 'ISIN', value: 'MYL1155OO009', validFrom: '2010-01-01' },
      { type: 'RIC', value: 'MBBM.KL', validFrom: '2010-01-01' },
      { type: 'stock_code', value: '1155', validFrom: '2010-01-01' },
    ],
    createdAt: '2010-01-01T00:00:00Z',
    updatedAt: '2024-11-04T09:20:00Z',
  },
  {
    id: 'HSBC-HK',
    name: 'HSBC Holdings plc',
    assetClass: 'equity',
    exchange: 'HKEX',
    currency: 'HKD',
    status: 'active',
    identifiers: [
      { type: 'ISIN', value: 'GB0005405286', validFrom: '2010-01-01' },
      { type: 'RIC', value: '0005.HK', validFrom: '2010-01-01' },
      { type: 'stock_code', value: '0005', validFrom: '2010-01-01' },
    ],
    createdAt: '2010-01-01T00:00:00Z',
    updatedAt: '2024-11-03T11:00:00Z',
  },
]

export const mockCorporateActions: CorporateAction[] = [
  {
    id: 'CORP-12345',
    securityId: 'DBS-SG',
    securityName: 'DBS Group Holdings Limited',
    eventType: 'dividend',
    announcementDate: '2024-10-20',
    exDate: '2024-11-15',
    recordDate: '2024-11-16',
    paymentDate: '2024-12-15',
    amount: '0.50',
    currency: 'SGD',
    taxTreatment: '5% withholding (Singapore)',
    status: 'confirmed',
    source: 'Bloomberg',
    createdAt: '2024-10-20T14:30:00Z',
    createdBy: 'system_ingest',
  },
  {
    id: 'CORP-12346',
    securityId: 'OCBC-SG',
    securityName: 'Oversea-Chinese Banking Corporation',
    eventType: 'stock_split',
    announcementDate: '2024-10-25',
    exDate: '2024-12-01',
    recordDate: '2024-12-02',
    rate: '1:2',
    status: 'pending',
    source: 'SGX',
    createdAt: '2024-10-25T10:00:00Z',
    createdBy: 'system_ingest',
  },
  {
    id: 'CORP-12347',
    securityId: 'UOB-SG',
    securityName: 'United Overseas Bank Limited',
    eventType: 'dividend',
    announcementDate: '2024-11-01',
    exDate: '2024-11-20',
    recordDate: '2024-11-21',
    paymentDate: '2024-12-20',
    amount: '0.75',
    currency: 'SGD',
    taxTreatment: '5% withholding (Singapore)',
    status: 'confirmed',
    source: 'Bloomberg',
    createdAt: '2024-11-01T09:15:00Z',
    createdBy: 'system_ingest',
  },
  {
    id: 'CORP-12348',
    securityId: 'MAYBANK-MY',
    securityName: 'Malayan Banking Berhad',
    eventType: 'dividend',
    announcementDate: '2024-10-15',
    exDate: '2024-11-10',
    recordDate: '2024-11-11',
    paymentDate: '2024-12-10',
    amount: '0.30',
    currency: 'MYR',
    status: 'settled',
    source: 'Bursa',
    createdAt: '2024-10-15T11:00:00Z',
    createdBy: 'system_ingest',
  },
]

export const mockConflicts: Conflict[] = [
  {
    id: 'CONF-2024-0847',
    securityId: 'DBS-SG',
    securityName: 'DBS Group Holdings Limited',
    eventType: 'dividend',
    conflictType: 'amount',
    sources: [
      {
        source: 'Bloomberg',
        data: { amount: '0.50', exDate: '2024-11-15' },
        retrievedAt: '2024-11-07T14:15:00Z',
        confidence: 'HIGH',
      },
      {
        source: 'Custodian',
        data: { amount: '0.49', exDate: '2024-11-15' },
        retrievedAt: '2024-11-07T16:00:00Z',
        confidence: 'MEDIUM',
      },
    ],
    details: '$0.50 vs $0.49',
    status: 'unresolved',
    createdAt: '2024-11-07T16:05:00Z',
  },
  {
    id: 'CONF-2024-0848',
    securityId: 'OCBC-SG',
    securityName: 'Oversea-Chinese Banking Corporation',
    eventType: 'stock_split',
    conflictType: 'date',
    sources: [
      {
        source: 'SGX',
        data: { exDate: '2024-11-15', rate: '1:2' },
        retrievedAt: '2024-11-06T10:00:00Z',
        confidence: 'HIGH',
      },
      {
        source: 'Bloomberg',
        data: { exDate: '2024-11-16', rate: '1:2' },
        retrievedAt: '2024-11-06T10:30:00Z',
        confidence: 'HIGH',
      },
    ],
    details: 'Nov 15 vs Nov 16',
    status: 'unresolved',
    createdAt: '2024-11-06T10:35:00Z',
  },
]

export const mockDataSources: DataSourceStatus[] = [
  {
    name: 'Bloomberg Terminal',
    status: 'connected',
    lastSync: '2024-11-07T16:30:00Z',
    recordsSynced24h: 1247,
    syncFrequency: 'Real-time',
    nextSync: '2024-11-07T16:31:00Z',
  },
  {
    name: 'SGX Exchange',
    status: 'connected',
    lastSync: '2024-11-07T15:00:00Z',
    recordsSynced24h: 89,
    syncFrequency: 'Hourly',
    nextSync: '2024-11-07T16:00:00Z',
  },
  {
    name: 'Custodian (BNY Mellon)',
    status: 'connected',
    lastSync: '2024-11-07T16:45:00Z',
    recordsSynced24h: 342,
    syncFrequency: 'Every 2 hours',
    nextSync: '2024-11-07T18:45:00Z',
  },
  {
    name: 'Bursa Malaysia',
    status: 'connected',
    lastSync: '2024-11-07T14:00:00Z',
    recordsSynced24h: 156,
    syncFrequency: 'Every 3 hours',
    nextSync: '2024-11-07T17:00:00Z',
  },
]

export const mockSystemHealth: SystemHealth = {
  lookupEngine: 'operational',
  databaseResponseTime: 12,
  cacheHitRate: 94.5,
  lastDataSync: '2024-11-07T16:45:00Z',
}

export const mockDashboardMetrics: DashboardMetrics = {
  actionsProcessed: 156,
  failedLookups: 3,
  unresolvedConflicts: 2,
  ingestionRate: 47,
  securitiesCount: 2847,
  identifierMappings: 11234,
  activeActions: 89,
  apiCalls24h: 15623,
}

export const mockActivityFeed: ActivityFeed[] = [
  {
    id: 'act-1',
    type: 'ingest',
    description: 'New dividend ingested for DBS Group Holdings',
    timestamp: '2024-11-07T16:45:00Z',
    status: 'success',
    details: '$0.50 per share, ex-date 2024-11-15',
  },
  {
    id: 'act-2',
    type: 'conflict',
    description: 'Conflict flagged: DBS dividend amount mismatch',
    timestamp: '2024-11-07T16:05:00Z',
    status: 'warning',
    details: 'Bloomberg ($0.50) vs Custodian ($0.49)',
  },
  {
    id: 'act-3',
    type: 'sync',
    description: 'Data sync completed from Bloomberg Terminal',
    timestamp: '2024-11-07T16:30:00Z',
    status: 'success',
    details: '1,247 records updated',
  },
  {
    id: 'act-4',
    type: 'lookup',
    description: 'Failed lookup: INVALID123',
    timestamp: '2024-11-07T16:20:00Z',
    status: 'failure',
    details: 'Identifier not found in registry',
  },
  {
    id: 'act-5',
    type: 'resolution',
    description: 'Conflict resolved for OCBC stock split',
    timestamp: '2024-11-07T15:45:00Z',
    status: 'success',
    details: 'Accepted SGX source (ex-date: Nov 15)',
  },
]

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.tan@firm.com',
    name: 'John Tan',
    role: 'analyst',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-11-07T08:30:00Z',
    status: 'active',
  },
  {
    id: 'user-2',
    email: 'jane.lee@firm.com',
    name: 'Jane Lee',
    role: 'senior_analyst',
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-11-07T09:15:00Z',
    status: 'active',
  },
  {
    id: 'user-3',
    email: 'admin@firm.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-11-07T07:00:00Z',
    status: 'active',
  },
]

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    timestamp: '2024-11-07T16:45:00Z',
    user: 'system_ingest',
    action: 'ingest_event',
    entity: 'Event:CORP-12345',
    details: 'Added dividend for DBS',
    status: 'SUCCESS',
  },
  {
    id: 'audit-2',
    timestamp: '2024-11-07T16:30:00Z',
    user: 'system_ingest',
    action: 'lookup',
    entity: 'ISIN:SG9999009436',
    details: 'Resolved to DBS-SG (cache hit)',
    status: 'SUCCESS',
  },
  {
    id: 'audit-3',
    timestamp: '2024-11-07T15:45:00Z',
    user: 'jane.lee@firm.com',
    action: 'resolve_conflict',
    entity: 'CONF-2024-0848',
    details: 'Chose SGX source',
    status: 'SUCCESS',
  },
]

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

export function getEventTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    dividend: 'Dividend',
    stock_split: 'Stock Split',
    merger: 'Merger',
    rights_offering: 'Rights Offering',
    spin_off: 'Spin-off',
    tender_offer: 'Tender Offer',
  }
  return labels[type] || type
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-success text-success-foreground',
    inactive: 'bg-muted text-muted-foreground',
    archived: 'bg-muted text-muted-foreground',
    pending: 'bg-yellow-500 text-white',
    confirmed: 'bg-accent text-accent-foreground',
    settled: 'bg-success text-success-foreground',
    voided: 'bg-destructive text-destructive-foreground',
    unresolved: 'bg-destructive text-destructive-foreground',
    resolved: 'bg-success text-success-foreground',
    operational: 'bg-success text-success-foreground',
    degraded: 'bg-yellow-500 text-white',
    down: 'bg-destructive text-destructive-foreground',
    connected: 'bg-success text-success-foreground',
    disconnected: 'bg-destructive text-destructive-foreground',
  }
  return colors[status] || 'bg-muted text-muted-foreground'
}
