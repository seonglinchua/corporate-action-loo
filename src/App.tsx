import { Route, Switch } from 'wouter'
import { Navigation } from './components/Navigation'
import { Dashboard } from './pages/Dashboard'
import { SecuritiesRegistry } from './pages/SecuritiesRegistry'
import { SecurityDetail } from './pages/SecurityDetail'
import { IdentifierLookup } from './pages/IdentifierLookup'
import { CorporateActionsEvents } from './pages/CorporateActionsEvents'
import { ReconciliationConflicts } from './pages/ReconciliationConflicts'
import { DataSources } from './pages/DataSources'
import { Analytics } from './pages/Analytics'
import { Admin } from './pages/Admin'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-full px-6 py-8">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/securities" component={SecuritiesRegistry} />
          <Route path="/securities/:id" component={SecurityDetail} />
          <Route path="/lookup" component={IdentifierLookup} />
          <Route path="/events" component={CorporateActionsEvents} />
          <Route path="/conflicts" component={ReconciliationConflicts} />
          <Route path="/sources" component={DataSources} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/admin" component={Admin} />
          <Route>
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">404 - Page Not Found</h2>
                <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
      <Toaster />
    </div>
  )
}

export default App