import { Link, useLocation } from 'wouter'
import { Button } from '@/components/ui/button'
import {
  House,
  Database,
  MagnifyingGlass,
  CalendarDots,
  Scales,
  CloudArrowDown,
  ChartLine,
  GearSix,
  ClockCounterClockwise,
  SignOut,
} from '@phosphor-icons/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant={active ? 'default' : 'ghost'}
        size="sm"
        className="gap-2"
      >
        {icon}
        {label}
      </Button>
    </Link>
  )
}

export function Navigation() {
  const [location] = useLocation()
  
  const navItems = [
    { href: '/', icon: <House size={18} />, label: 'Dashboard' },
    { href: '/securities', icon: <Database size={18} />, label: 'Securities' },
    { href: '/lookup', icon: <MagnifyingGlass size={18} />, label: 'Lookup' },
    { href: '/events', icon: <CalendarDots size={18} />, label: 'Events' },
    { href: '/conflicts', icon: <Scales size={18} />, label: 'Conflicts' },
    { href: '/sources', icon: <CloudArrowDown size={18} />, label: 'Data Sources' },
    { href: '/analytics', icon: <ChartLine size={18} />, label: 'Analytics' },
    { href: '/admin', icon: <GearSix size={18} />, label: 'Admin' },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="max-w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                CA
              </div>
              <div>
                <h1 className="text-lg font-semibold leading-none">Corporate Actions</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Lookup Engine</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  active={location === item.href}
                />
              ))}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JT
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <div className="text-sm font-medium">John Tan</div>
                  <div className="text-xs text-muted-foreground">Analyst</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <GearSix size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClockCounterClockwise size={16} className="mr-2" />
                Activity Log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <SignOut size={16} className="mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
