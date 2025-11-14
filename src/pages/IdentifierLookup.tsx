import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MagnifyingGlass, Check, X, Info } from '@phosphor-icons/react'
import { mockSecurities, formatDate, formatDateTime } from '@/lib/mock-data'
import { useKV } from '@github/spark/hooks'
import type { Security, LookupResult } from '@/lib/types'

export function IdentifierLookup() {
  const [securities] = useKV<Security[]>('securities', mockSecurities)
  const [identifier, setIdentifier] = useState('')
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLookup = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      const found = (securities || []).find((security) =>
        security.identifiers.some((id) => 
          id.value.toLowerCase() === identifier.toLowerCase()
        )
      )

      if (found) {
        setLookupResult({
          found: true,
          security: found,
          confidence: 'HIGH',
          dataSources: [
            { source: 'Bloomberg', lastSynced: '2024-11-07T16:30:00Z' },
            { source: 'SGX', lastSynced: '2024-11-07T15:00:00Z' },
            { source: 'Custodian', lastSynced: '2024-11-06T14:00:00Z' },
          ],
        })
      } else {
        const suggestions = (securities || [])
          .map((security) => ({
            name: security.name,
            match: Math.floor(Math.random() * 40) + 40,
          }))
          .sort((a, b) => b.match - a.match)
          .slice(0, 3)

        setLookupResult({
          found: false,
          suggestions,
        })
      }
      
      setIsLoading(false)
    }, 500)
  }

  const getConfidenceColor = (confidence: string) => {
    if (confidence === 'HIGH') return 'text-success'
    if (confidence === 'MEDIUM') return 'text-yellow-600'
    return 'text-destructive'
  }

  const getConfidenceValue = (confidence: string) => {
    if (confidence === 'HIGH') return 90
    if (confidence === 'MEDIUM') return 60
    return 30
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Identifier Lookup</h2>
        <p className="text-muted-foreground mt-1">Resolve identifiers to securities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lookup Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Identifier</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="ISIN, RIC, CUSIP, or stock code..."
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && identifier.trim()) {
                        handleLookup()
                      }
                    }}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={handleLookup}
                  disabled={!identifier.trim() || isLoading}
                  className="gap-2"
                >
                  <MagnifyingGlass size={18} />
                  Resolve
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Try: SG9999009436, DBSM.SI, D05, or INVALID123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Resolving identifier...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && lookupResult && lookupResult.found && lookupResult.security && (
        <Card className="border-success">
          <CardHeader className="bg-success/5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
                <Check size={18} weight="bold" />
              </div>
              <CardTitle>Successfully Resolved</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Security ID</div>
                  <div className="mt-1 text-lg font-semibold font-mono-numeric">{lookupResult.security.id}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div className="mt-1 text-lg font-medium">{lookupResult.security.name}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Confidence</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${getConfidenceColor(lookupResult.confidence || 'LOW')}`}>
                        {lookupResult.confidence}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {getConfidenceValue(lookupResult.confidence || 'LOW')}%
                      </span>
                    </div>
                    <Progress value={getConfidenceValue(lookupResult.confidence || 'LOW')} className="h-2" />
                    <p className="text-xs text-muted-foreground">Exact ISIN match</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Identifiers</div>
                  <div className="space-y-2">
                    {lookupResult.security.identifiers.map((id, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground">├─</span>
                        <div>
                          <span className="font-medium">{id.type}:</span>
                          <span className="ml-2 font-mono-numeric">{id.value}</span>
                          {id.validFrom && (
                            <span className="ml-2 text-muted-foreground">(since {formatDate(id.validFrom)})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Exchange</div>
                    <div className="mt-1">{lookupResult.security.exchange}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Asset Class</div>
                    <div className="mt-1 capitalize">{lookupResult.security.assetClass}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Currency</div>
                    <div className="mt-1">{lookupResult.security.currency}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Data Sources</div>
              <div className="space-y-2">
                {lookupResult.dataSources?.map((source, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">├─</span>
                    <div>
                      <span className="font-medium">{source.source}</span>
                      <span className="ml-2 text-muted-foreground">
                        (last synced: {formatDateTime(source.lastSynced)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && lookupResult && !lookupResult.found && (
        <Card className="border-destructive">
          <CardHeader className="bg-destructive/5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                <X size={18} weight="bold" />
              </div>
              <CardTitle>Lookup Failed</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Input</div>
              <div className="mt-1 font-mono-numeric">{identifier}</div>
            </div>

            <Alert>
              <Info size={18} />
              <AlertDescription>
                <span className="font-medium">Status:</span> NOT FOUND
              </AlertDescription>
            </Alert>

            {lookupResult.suggestions && lookupResult.suggestions.length > 0 && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-3">Suggestions (fuzzy matches)</div>
                <div className="space-y-2">
                  {lookupResult.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">├─</span>
                        <span className="font-medium">{suggestion.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{suggestion.match}% match</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Troubleshooting</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- Check spelling and try again</li>
                <li>- Try using ISIN, RIC, or stock code instead</li>
                <li>- Contact admin if the identifier should exist</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
