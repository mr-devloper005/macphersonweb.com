import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

const companyLinks = [
  { name: 'About', href: '/about' },
]

export function Footer() {
  const taskRoutes = SITE_CONFIG.tasks.filter((task) => task.key === 'pdf' || task.key === 'profile')

  return (
    <footer className="border-t border-[#ebcab9] bg-[linear-gradient(180deg,#fffaf2_0%,#fff0e1_100%)] text-[#3b241c]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6558]">Task routes</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#6f473b]">
              {taskRoutes.map((task) => (
                <li key={task.key}>
                  <Link href={task.route} className="inline-flex items-center gap-2 hover:text-[#3b241c]">
                    <span>{task.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6558]">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6f473b]">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-[#3b241c]">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#ebcab9] pt-6 text-sm text-[#8b5c4f]">
          <span>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {siteContent.footer.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
