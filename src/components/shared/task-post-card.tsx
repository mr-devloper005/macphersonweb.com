import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag, User } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 150) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardByTask: Record<TaskKey, {
  frame: string
  muted: string
  title: string
  badge: string
  compactFrame?: string
}> = {
  pdf: {
    frame: 'rounded-[1.9rem] border border-[#e4b8a4] bg-[linear-gradient(180deg,#fffdfa_0%,#fff1e5_100%)] shadow-[0_20px_60px_rgba(149,87,65,0.14)] hover:-translate-y-1 hover:shadow-[0_26px_68px_rgba(149,87,65,0.18)]',
    muted: 'text-[#764b3f]',
    title: 'text-[#2f1a13]',
    badge: 'bg-[#2f1a13] text-[#fff4ea]',
    compactFrame: 'rounded-[1.4rem] border border-[#e5bead] bg-[#fff8f1] shadow-[0_14px_40px_rgba(149,87,65,0.1)]',
  },
  profile: {
    frame: 'rounded-[1.9rem] border border-[#ebcfbf] bg-white shadow-[0_20px_56px_rgba(128,78,61,0.11)] hover:-translate-y-1 hover:shadow-[0_26px_64px_rgba(128,78,61,0.14)]',
    muted: 'text-[#755045]',
    title: 'text-[#2e211a]',
    badge: 'bg-[#ffe7d9] text-[#8f5a4b]',
    compactFrame: 'rounded-[1.4rem] border border-[#ecd3c5] bg-[#fffdfb] shadow-[0_12px_30px_rgba(128,78,61,0.08)]',
  },
  article: {
    frame: 'rounded-[1.9rem] border border-[#dcc6b6] bg-[#fff9f2] shadow-[0_16px_50px_rgba(92,57,37,0.12)] hover:-translate-y-1',
    muted: 'text-[#6f5648]',
    title: 'text-[#30221b]',
    badge: 'bg-[#30221b] text-[#fff2e1]',
  },
  listing: {
    frame: 'rounded-[1.85rem] border border-[#d7deca] bg-[#f8faf1] shadow-[0_16px_48px_rgba(55,65,31,0.1)] hover:-translate-y-1',
    muted: 'text-[#56604b]',
    title: 'text-[#1f2617]',
    badge: 'bg-[#1f2617] text-[#edf5dc]',
  },
  classified: {
    frame: 'rounded-[1.85rem] border border-[#f0cfbb] bg-[#fff5ea] shadow-[0_18px_52px_rgba(148,82,54,0.1)] hover:-translate-y-1',
    muted: 'text-[#7d543f]',
    title: 'text-[#3d271e]',
    badge: 'bg-[#b6654f] text-white',
  },
  image: {
    frame: 'rounded-[1.9rem] border border-white/15 bg-[linear-gradient(180deg,rgba(20,22,31,0.96),rgba(31,36,51,0.96))] text-white shadow-[0_24px_80px_rgba(14,18,31,0.45)] hover:-translate-y-1',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#ffe2b8] text-[#2c1a12]',
  },
  sbm: {
    frame: 'rounded-[1.85rem] border border-[#dfd2c8] bg-[#fdf8f2] shadow-[0_16px_48px_rgba(76,54,40,0.09)] hover:-translate-y-1',
    muted: 'text-[#725a4d]',
    title: 'text-[#2d211a]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
  },
  social: {
    frame: 'rounded-[1.85rem] border border-[#e1ccd0] bg-[#fff8fa] shadow-[0_16px_48px_rgba(88,53,68,0.09)] hover:-translate-y-1',
    muted: 'text-[#7b5966]',
    title: 'text-[#3b2530]',
    badge: 'bg-[#6f3248] text-[#fff4f7]',
  },
  org: {
    frame: 'rounded-[1.85rem] border border-[#d5dcf0] bg-[#f9fbff] shadow-[0_16px_48px_rgba(55,74,127,0.1)] hover:-translate-y-1',
    muted: 'text-[#4d5e8e]',
    title: 'text-[#1d2c52]',
    badge: 'bg-[#1d2c52] text-[#eef3ff]',
  },
  comment: {
    frame: 'rounded-[1.85rem] border border-[#ddd4c9] bg-[#fffbf6] shadow-[0_16px_48px_rgba(75,63,46,0.09)] hover:-translate-y-1',
    muted: 'text-[#6f5f48]',
    title: 'text-[#2b2418]',
    badge: 'bg-[#2b2418] text-[#fff4e1]',
  },
}

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'article'
  const visualVariant = cardByTask[variant]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[3/4]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant}`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'
  const cardFrame = compact && visualVariant.compactFrame ? visualVariant.compactFrame : visualVariant.frame

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${cardFrame}`}>
        <div className="mt-1 rounded-full bg-black/5 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${cardFrame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2f1a13] shadow">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        ) : null}
        {variant === 'profile' ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2f1a13] shadow">
            <User className="h-3.5 w-3.5" />
            Profile
          </span>
        ) : null}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location ? <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div> : null}
          {content.email ? <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
          <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${visualVariant.title}`}>
            Open details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
