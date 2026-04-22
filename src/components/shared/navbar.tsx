'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Compass, FileText, Image as ImageIcon, LayoutGrid, Menu, Search, Tag, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, type TaskConfig, type TaskKey } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

function sortEmphasizedTasks(tasks: TaskConfig[]) {
  const priority = new Map<TaskKey, number>([
    ['pdf', 0],
    ['profile', 1],
    ['article', 2],
    ['listing', 3],
    ['classified', 4],
    ['image', 5],
    ['sbm', 6],
    ['social', 7],
    ['org', 8],
    ['comment', 9],
  ])

  return [...tasks].sort((a, b) => (priority.get(a.key) ?? 99) - (priority.get(b.key) ?? 99))
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    document.body.classList.add('has-left-rail-nav')
    return () => {
      document.body.classList.remove('has-left-rail-nav')
    }
  }, [])

  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const rankedTasks = useMemo(() => sortEmphasizedTasks(enabledTasks), [enabledTasks])
  const emphasizedTasks = rankedTasks.slice(0, 2)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e8c8b7]/75 bg-[rgba(255,245,233,0.96)] px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[#e2b6a2] bg-white p-1 shadow-[0_10px_24px_rgba(160,84,60,0.14)]">
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-[#3a241c]">{SITE_CONFIG.name}</p>
              <p className="truncate text-[10px] uppercase tracking-[0.22em] text-[#8a5a4e]">PDF + Profile</p>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-xl text-[#3a241c]" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-[rgba(27,16,11,0.45)] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-[84%] max-w-sm overflow-y-auto border-r border-[#e6c7b7] bg-[linear-gradient(180deg,#fff7ee_0%,#fff0e2_100%)] p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a6558]">Primary tasks</p>
            <div className="mt-3 space-y-2">
              {emphasizedTasks.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const active = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
                      active
                        ? 'border-[#b6614b] bg-[#b6614b] text-white'
                        : 'border-[#e6c7b7] bg-white text-[#4d3129] hover:bg-[#fff8f2]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {task.label}
                  </Link>
                )
              })}
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a6558]">Task routes</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {taskRoutes.map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl border border-[#e6c7b7] bg-white px-3 py-2 text-xs font-medium text-[#6a4438]"
                >
                  {task.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button asChild className="flex-1 rounded-xl bg-[#2e1a13] text-[#fff7ef] hover:bg-[#4a2a1f]">
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
                  <Search className="h-4 w-4" />
                  Search
                </Link>
              </Button>
              {!isAuthenticated ? (
                <Button asChild variant="outline" className="flex-1 rounded-xl border-[#d9b5a4] bg-white text-[#4d3129]">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}

      <header className="site-left-rail fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-[#e6c4b4] bg-[linear-gradient(180deg,#fff8ef_0%,#fff1e4_48%,#ffe9da_100%)] lg:flex lg:flex-col">
        <div className="border-b border-[#ebcfc2] px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[#dba995] bg-white p-1 shadow-[0_14px_30px_rgba(149,82,62,0.18)]">
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-[#2f1a13]">{SITE_CONFIG.name}</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#9a6658]">Premium PDF + Profile</p>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-6 text-[#7b4f41]">A refined platform for document libraries and identity-first public profiles.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="rounded-2xl border border-[#e7c8ba] bg-white/85 p-3 shadow-[0_10px_24px_rgba(148,88,68,0.08)]">
            <div className="mt-2 space-y-1.5">
              {emphasizedTasks.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const active = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors',
                      active
                        ? 'border-[#b2604b] bg-[#b2604b] text-white'
                        : 'border-transparent text-[#4e3028] hover:border-[#ebccbe] hover:bg-[#fff7f1]'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {task.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <Link href="/search" className="mt-4 flex items-center gap-2 rounded-2xl border border-[#ebcbbb] bg-white px-3 py-2.5 text-sm font-semibold text-[#412821] shadow-[0_8px_18px_rgba(150,89,69,0.08)] transition-colors hover:bg-[#fff8f2]">
            <Search className="h-4 w-4" />
            Search everything
          </Link>

          <Link href="/about" className="mt-2 flex items-center gap-2 rounded-2xl border border-[#ebcbbb] bg-white px-3 py-2.5 text-sm font-semibold text-[#412821] transition-colors hover:bg-[#fff8f2]">
            <Compass className="h-4 w-4" />
            About
          </Link>
        </div>

        <div className="border-t border-[#ebcfc2] px-4 py-4">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="rounded-xl border-[#dcb6a5] bg-white text-[#4a2d24]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-xl bg-[#2e1a13] text-[#fff7ef] hover:bg-[#4a2a1f]">
                <Link href="/register">Join</Link>
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
