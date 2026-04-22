import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

export default async function HomePage() {
  const pdfTask = SITE_CONFIG.tasks.find((task) => task.key === 'pdf')
  const profileTask = SITE_CONFIG.tasks.find((task) => task.key === 'profile')

  const [pdfPosts, profilePosts] = await Promise.all([
    fetchTaskPosts('pdf', 6, { allowMockFallback: true, fresh: true }),
    fetchTaskPosts('profile', 5, { allowMockFallback: true, fresh: true }),
  ])

  const leadPdf = pdfPosts[0]
  const leadProfile = profilePosts[0]
  const pdfCategories = new Set(
    pdfPosts
      .map((post) => {
        const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
        return typeof content.category === 'string' ? content.category : post.tags?.[0]
      })
      .filter((value): value is string => Boolean(value))
  ).size
  const profileLocations = new Set(
    profilePosts
      .map((post) => {
        const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
        return typeof content.location === 'string' ? content.location : typeof content.address === 'string' ? content.address : ''
      })
      .filter(Boolean)
  ).size

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        <section className="relative border-b border-[#ebcab9]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[#2f1a13] sm:text-6xl">
                  Premium PDF resources with trusted profile context.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#71483d]">{SITE_CONFIG.description}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={pdfTask?.route || '/pdf'} className="inline-flex items-center gap-2 rounded-full bg-[#2f1a13] px-5 py-3 text-sm font-semibold text-[#fff6ee] hover:bg-[#4d2b20]">
                    <FileText className="h-4 w-4" />
                    Explore PDFs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={profileTask?.route || '/profile'} className="inline-flex items-center gap-2 rounded-full border border-[#d7b2a1] bg-white px-5 py-3 text-sm font-semibold text-[#5d3a30] hover:bg-[#fff8f2]">
                    <User className="h-4 w-4" />
                    Browse Profiles
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e5c4b4] bg-white/88 p-6 shadow-[0_24px_60px_rgba(143,86,65,0.14)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6658]">Recently posted</p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-[#ecd0c3] bg-[#fff8f2] p-4">
                    <p className="text-sm font-semibold text-[#3f261d]">{pdfPosts.length} PDF resources published</p>
                    <p className="mt-1 text-sm text-[#744b3f]">Across {pdfCategories || 0} active categories from contributor uploads.</p>
                  </div>
                  <div className="rounded-2xl border border-[#ecd0c3] bg-[#fff8f2] p-4">
                    <p className="text-sm font-semibold text-[#3f261d]">{profilePosts.length} profile entries available</p>
                    <p className="mt-1 text-sm text-[#744b3f]">Covering {profileLocations || 0} profile locations with public contributor pages.</p>
                  </div>
                  <div className="rounded-2xl border border-[#ecd0c3] bg-[#fff8f2] p-4">
                    <p className="text-sm font-semibold text-[#3f261d]">Latest upload</p>
                    <p className="mt-1 text-sm text-[#744b3f]">
                      {leadPdf?.title || profilePosts[0]?.title || 'New content appears here as soon as it is published.'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Link href={leadPdf ? getTaskHref('pdf', leadPdf.slug) : (pdfTask?.route || '/pdf')} className="overflow-hidden rounded-2xl border border-[#ecd0c3] bg-white transition hover:shadow-[0_10px_24px_rgba(132,80,62,0.14)]">
                    <div className="relative h-28">
                      <ContentImage
                        src={leadPdf?.media?.[0]?.url || '/placeholder.svg?height=600&width=900'}
                        alt={leadPdf?.title || 'Latest PDF'}
                        fill
                        className="object-cover"
                        intrinsicWidth={900}
                        intrinsicHeight={600}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9c6658]">Latest PDF</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#3f261d]">{leadPdf?.title || 'No PDF yet'}</p>
                    </div>
                  </Link>
                  <Link href={leadProfile ? getTaskHref('profile', leadProfile.slug) : (profileTask?.route || '/profile')} className="overflow-hidden rounded-2xl border border-[#ecd0c3] bg-white transition hover:shadow-[0_10px_24px_rgba(132,80,62,0.14)]">
                    <div className="relative h-28">
                      <ContentImage
                        src={leadProfile?.media?.[0]?.url || '/placeholder.svg?height=600&width=900'}
                        alt={leadProfile?.title || 'Latest profile'}
                        fill
                        className="object-cover"
                        intrinsicWidth={900}
                        intrinsicHeight={600}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9c6658]">Latest Profile</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#3f261d]">{leadProfile?.title || 'No profile yet'}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-3 border-b border-[#ebcab9] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6658]">Featured PDF collection</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#2f1a13]">Start with premium document resources.</h2>
            </div>
            <Link href={pdfTask?.route || '/pdf'} className="text-sm font-semibold text-[#7a4e40] hover:text-[#2f1a13]">View all PDFs</Link>
          </div>

          {leadPdf ? (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="self-start">
                <TaskPostCard post={leadPdf} href={getTaskHref('pdf', leadPdf.slug)} taskKey="pdf" />
              </div>
              <div className="grid gap-4">
                {(pdfPosts.length ? pdfPosts.slice(1, 4) : []).map((post) => (
                  <TaskPostCard key={post.id} post={post} href={getTaskHref('pdf', post.slug)} taskKey="pdf" compact />
                ))}
                {!pdfPosts.length ? (
                  <div className="rounded-[1.6rem] border border-dashed border-[#dcb8a8] bg-white/75 p-8 text-sm text-[#825749]">
                    PDF resources will appear here as soon as new content is published.
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.6rem] border border-dashed border-[#dcb8a8] bg-white/75 p-10 text-sm text-[#825749]">No PDF posts yet.</div>
          )}
        </section>

        <section className="border-y border-[#ebcab9] bg-[linear-gradient(180deg,#fff7ee_0%,#fff2e4_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6658]">Secondary spotlight</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#2f1a13]">Profiles that give documents a trusted source.</h2>
              </div>
              <Link href={profileTask?.route || '/profile'} className="text-sm font-semibold text-[#7a4e40] hover:text-[#2f1a13]">Open profile hub</Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profilePosts.slice(0, 3).map((post) => (
                <TaskPostCard key={post.id} post={post} href={getTaskHref('profile', post.slug)} taskKey="profile" />
              ))}
              {!profilePosts.length ? (
                <div className="md:col-span-2 lg:col-span-3 rounded-[1.6rem] border border-dashed border-[#dcb8a8] bg-white/75 p-10 text-sm text-[#825749]">No profile posts yet.</div>
              ) : null}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
