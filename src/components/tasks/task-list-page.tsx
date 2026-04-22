import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const shellByTask: Record<TaskKey, string> = {
  listing: 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  article: 'bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  image: 'bg-[linear-gradient(180deg,#0b1020_0%,#151d31_100%)] text-white',
  profile: 'bg-[linear-gradient(180deg,#fff7ef_0%,#fffdf9_100%)]',
  classified: 'bg-[linear-gradient(180deg,#fff2e7_0%,#ffffff_100%)]',
  sbm: 'bg-[linear-gradient(180deg,#fffaf4_0%,#ffffff_100%)]',
  social: 'bg-[linear-gradient(180deg,#fff8fa_0%,#ffffff_100%)]',
  pdf: 'bg-[linear-gradient(180deg,#fff6ee_0%,#fff0e0_56%,#ffffff_100%)]',
  org: 'bg-[linear-gradient(180deg,#f5f8ff_0%,#ffffff_100%)]',
  comment: 'bg-[linear-gradient(180deg,#fdf9f2_0%,#ffffff_100%)]',
}

const uiByTask: Record<TaskKey, { muted: string; panel: string; soft: string; input: string; button: string; badge: string }> = {
  listing: {
    muted: 'text-slate-600',
    panel: 'border border-slate-200 bg-white',
    soft: 'border border-slate-200 bg-slate-50',
    input: 'border border-slate-200 bg-white text-slate-900',
    button: 'bg-slate-900 text-white hover:bg-slate-800',
    badge: 'bg-slate-900 text-white',
  },
  article: {
    muted: 'text-[#72594a]',
    panel: 'border border-[#dbc6b6] bg-white/90',
    soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
    input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
    button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    badge: 'bg-[#2f1d16] text-[#fff4e4]',
  },
  image: {
    muted: 'text-slate-300',
    panel: 'border border-white/10 bg-white/7',
    soft: 'border border-white/10 bg-white/5',
    input: 'border border-white/10 bg-white/8 text-white',
    button: 'bg-white text-slate-950 hover:bg-slate-200',
    badge: 'bg-[#ffe2b8] text-[#2c1a12]',
  },
  profile: {
    muted: 'text-[#714d41]',
    panel: 'border border-[#e4c5b6] bg-white/92',
    soft: 'border border-[#ecd3c6] bg-[#fff8f2]',
    input: 'border border-[#dcc0b2] bg-white text-[#2f1a13]',
    button: 'bg-[#2f1a13] text-[#fff4ea] hover:bg-[#4d2b20]',
    badge: 'bg-[#ffe7d8] text-[#8f5b4c]',
  },
  classified: {
    muted: 'text-[#7d543f]',
    panel: 'border border-[#edcfbe] bg-white',
    soft: 'border border-[#f0d9cc] bg-[#fff7ef]',
    input: 'border border-[#e8c4b0] bg-white text-[#3f271e]',
    button: 'bg-[#b7654f] text-white hover:bg-[#9f5744]',
    badge: 'bg-[#b7654f] text-white',
  },
  sbm: {
    muted: 'text-[#71584a]',
    panel: 'border border-[#dfcec0] bg-[#fffdf8]',
    soft: 'border border-[#e8d8cc] bg-[#fff8f0]',
    input: 'border border-[#dbc8b8] bg-white text-[#2d211a]',
    button: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
  },
  social: {
    muted: 'text-[#7b5966]',
    panel: 'border border-[#e1ccd0] bg-[#fff9fb]',
    soft: 'border border-[#eddde1] bg-white',
    input: 'border border-[#e0c9d0] bg-white text-[#3b2530]',
    button: 'bg-[#6f3248] text-[#fff4f7] hover:bg-[#82405a]',
    badge: 'bg-[#6f3248] text-[#fff4f7]',
  },
  pdf: {
    muted: 'text-[#72493e]',
    panel: 'border border-[#e7bfac] bg-[linear-gradient(180deg,#fffdfa_0%,#fff3e9_100%)]',
    soft: 'border border-[#ecd1c3] bg-white/90',
    input: 'border border-[#ddb9a8] bg-white text-[#2f1a13]',
    button: 'bg-[#2f1a13] text-[#fff4ea] hover:bg-[#4d2b20]',
    badge: 'bg-[#2f1a13] text-[#fff4ea]',
  },
  org: {
    muted: 'text-[#516289]',
    panel: 'border border-[#d5dcf0] bg-white',
    soft: 'border border-[#e2e7f5] bg-[#f8faff]',
    input: 'border border-[#cfd8ef] bg-white text-[#1d2c52]',
    button: 'bg-[#1d2c52] text-[#eef3ff] hover:bg-[#2b3c67]',
    badge: 'bg-[#1d2c52] text-[#eef3ff]',
  },
  comment: {
    muted: 'text-[#6f5f48]',
    panel: 'border border-[#ddd4c9] bg-[#fffdf8]',
    soft: 'border border-[#e9e1d8] bg-white',
    input: 'border border-[#d8cfbf] bg-white text-[#2b2418]',
    button: 'bg-[#2b2418] text-[#fff4e1] hover:bg-[#443426]',
    badge: 'bg-[#2b2418] text-[#fff4e1]',
  },
}

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30, { allowMockFallback: task === 'pdf' || task === 'profile' })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const shellClass = shellByTask[task] || 'bg-background'
  const ui = uiByTask[task]
  const Icon = taskIcons[task] || LayoutGrid
  const hideCategoryPanel = task === 'pdf' || task === 'profile'
  const hideIntroLinks = task === 'pdf' || task === 'profile'

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${ui.panel}`}>
          <div className={`grid gap-7 ${hideCategoryPanel ? 'lg:grid-cols-1' : 'lg:grid-cols-[1.15fr_0.85fr]'} lg:items-start`}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.badge}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {taskConfig?.label || task}
                </span>
              </div>
              {task === 'pdf' ? (
                <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-foreground">Document vault curated for fast reading and download.</h1>
              ) : null}
              {task === 'profile' ? (
                <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-foreground">Identity-led profiles with trust and context built in.</h1>
              ) : null}
              {task === 'image' ? (
                <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Visual-first posts in a gallery rhythm.</h1>
              ) : null}
              {task !== 'pdf' && task !== 'profile' && task !== 'image' ? (
                <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              ) : null}
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                {task === 'pdf'
                  ? 'The PDF section is designed as a premium resource library with a quieter reading tone, stronger category scanning, and faster path to detail pages.'
                  : task === 'profile'
                    ? 'Profiles are presented with clarity and reputation cues so visitors can quickly understand who is behind each publication or document set.'
                    : task === 'image'
                      ? 'Image posts receive more visual weight and spacing so this surface avoids the same density pattern used by utility-heavy sections.'
                      : task === 'classified'
                        ? 'Classified posts keep urgency and comparability high with compact supporting modules and quick filter actions.'
                        : task === 'sbm'
                          ? 'Curated links are framed as collection-style entries with less noise and stronger skimmability.'
                          : 'This task page keeps its own composition and visual rhythm while preserving the same underlying content logic and behavior.'}
              </p>
            </div>

            {!hideCategoryPanel ? (
              <form className={`grid gap-3 rounded-[1.6rem] p-5 ${ui.soft}`} action={taskConfig?.route || '#'}>
                <div>
                  <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                  <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
                <Link href="/search" className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium ${ui.soft}`}>
                  Open global search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </form>
            ) : null}
          </div>

          {task === 'pdf' ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Guides', 'Policies', 'Research files'].map((label) => (
                <div key={label} className={`rounded-xl px-4 py-3 ${ui.soft}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          ) : null}

          {task === 'profile' ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Experts', 'Teams', 'Organizations'].map((label) => (
                <div key={label} className={`rounded-xl px-4 py-3 ${ui.soft}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            {!hideIntroLinks ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {intro.links.map((item) => (
                  <a key={item.href} href={item.href} className="font-semibold text-foreground hover:underline">{item.label}</a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
