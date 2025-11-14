export type UserRole = 'analyst' | 'senior_analyst' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  lastLogin: string
  status: 'active' | 'disabled'
}

export type AssetClass = 'equity' | 'bond' | 'fund' | 'derivative'
export type SecurityStatus = 'active' | 'inactive' | 'archived'

export interface Identifier {
  type: 'ISIN' | 'RIC' | 'CUSIP' | 'stock_code'
  value: string
  validFrom: string
  validTo?: string
}

export interface Security {
  id: string
  name: string
  assetClass: AssetClass
  exchange: string
  currency: string
  status: SecurityStatus
  identifiers: Identifier[]
  createdAt: string
  updatedAt: string
}

export type EventType = 'dividend' | 'stock_split' | 'merger' | 'rights_offering' | 'spin_off' | 'tender_offer'
export type EventStatus = 'pending' | 'confirmed' | 'settled' | 'voided'

export interface CorporateAction {
  id: string
  securityId: string
  securityName: string
  eventType: EventType
  announcementDate?: string
  exDate: string
  recordDate?: string
  paymentDate?: string
  amount?: string
  rate?: string
  currency?: string
  taxTreatment?: string
  status: EventStatus
  source: string
  notes?: string
  createdAt: string
  createdBy: string
}

export type ConflictType = 'amount' | 'date' | 'identifier' | 'event_type'
export type ConflictStatus = 'unresolved' | 'resolved' | 'archived'

export interface DataSource {
  source: string
  data: Record<string, any>
  retrievedAt: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface Conflict {
  id: string
  securityId: string
  securityName: string
  eventType: EventType
  conflictType: ConflictType
  sources: DataSource[]
  details: string
  status: ConflictStatus
  createdAt: string
  resolvedAt?: string
  resolvedBy?: string
  resolution?: string
  resolutionNotes?: string
}

export type SyncStatus = 'connected' | 'disconnected' | 'degraded'

export interface DataSourceStatus {
  name: string
  status: SyncStatus
  lastSync: string
  recordsSynced24h: number
  syncFrequency: string
  nextSync?: string
  errorMessage?: string
}

export interface SystemHealth {
  lookupEngine: 'operational' | 'degraded' | 'down'
  databaseResponseTime: number
  cacheHitRate: number
  lastDataSync: string
}

export interface DashboardMetrics {
  actionsProcessed: number
  failedLookups: number
  unresolvedConflicts: number
  ingestionRate: number
  securitiesCount: number
  identifierMappings: number
  activeActions: number
  apiCalls24h: number
}

export interface ActivityFeed {
  id: string
  type: 'lookup' | 'ingest' | 'conflict' | 'sync' | 'resolution'
  description: string
  timestamp: string
  status: 'success' | 'failure' | 'warning'
  details?: string
}

export interface LookupResult {
  found: boolean
  security?: Security
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW'
  dataSources?: Array<{ source: string; lastSynced: string }>
  suggestions?: Array<{ name: string; match: number }>
}

export interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  entity: string
  details: string
  status: 'SUCCESS' | 'FAILURE'
}
