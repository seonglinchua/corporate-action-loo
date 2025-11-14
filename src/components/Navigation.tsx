import { useState } from 'react'
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
  List,
  X,
} from '@phosphor-icons/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  isMobile?: boolean
}

function NavItem({ href, icon, label, active, isMobile }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant={active ? 'default' : 'ghost'}
        size={isMobile ? 'default' : 'sm'}
        className={isMobile ? 'w-full justify-start gap-3' : 'gap-2'}
      >
        {icon}
        {label}
      </Button>
    </Link>
  )
}

export function Navigation() {
  const [location] = useLocation()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleNavItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="border-b bg-card">
      <div className="max-w-full px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold flex-shrink-0">
                CA
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-lg font-semibold leading-none">Corporate Actions</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Lookup Engine</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-1 flex-1 justify-center mx-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  active={location === item.href}
                />
              ))}
            </div>
          )}

          {/* Right Section - Mobile Menu & User Profile */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            {isMobile && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                  >
                    <List size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col gap-2 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavItemClick}
                      >
                        <Button
                          variant={location === item.href ? 'default' : 'ghost'}
                          size="default"
                          className="w-full justify-start gap-3"
                        >
                          {item.icon}
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* User Profile Dropdown */}
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
      </div>
    </nav>
  )
}
