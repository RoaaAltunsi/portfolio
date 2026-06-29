import { ImageIcon, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../lib/types'


// ------------------------- Placeholder Preview -------------------------
function PlaceholderPreview({ title }: { title: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_25%_20%,rgba(10,10,10,0.06),transparent_30%),linear-gradient(135deg,#f9f9f8,#edeae4)] px-8 text-center">
      <div>
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-white/70">
          <ImageIcon size={20} className="text-ink/40" />
        </div>
        <p className="font-serif text-[clamp(28px,4vw,52px)] leading-none text-ink/70">{title}</p>
        <p className="mx-auto mt-3 max-w-[300px] text-xs leading-6 text-ink/40">
          Replace with a screenshot or demo video in the project data.
        </p>
      </div>
    </div>
  )
}

// ------------------------- Video Thumbnail Fallback -------------------------
function VideoThumbnailFallback({ index }: { index: number }) {
  return (
    <span className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,#111,#050505)] text-white">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/10">
        <Play size={14} fill="currentColor" />
      </span>
      <span className="absolute right-2 bottom-2 font-mono text-[9px] tracking-[0.18em] text-white/55">
        {String(index + 1).padStart(2, '0')}
      </span>
    </span>
  )
}


// ------------------------- Main Component -------------------------
export default function ProjectMediaGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const media = project.media
  const activeMedia = media[activeIndex] ?? media[0]
  const activeMediaType = activeMedia.type
  const activeMediaSrc = activeMedia.src

  // Pause the previous video when switching media, then autoplay the selected video.
  useEffect(() => {
    const video = videoRef.current

    if (!video || activeMediaType !== 'video' || !activeMediaSrc) return

    video.muted = false
    const playPromise = video.play()
    if (playPromise) {
      playPromise
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false))
    }
  }, [activeIndex, activeMediaSrc, activeMediaType, project.id])

  const toggleVideoPlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.muted = true
      const playPromise = video.play()
      if (playPromise) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => setIsVideoPlaying(false))
      }
    } else {
      video.pause()
      setIsVideoPlaying(false)
    }
  }


  return (
    <div className="flex grow flex-col gap-5">

      {/* ── Main media frame ── */}
      <div className="relative overflow-hidden rounded-[20px] border border-zinc-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        {/* Decorative abstract curve — top-right */}
        <div
          className="pointer-events-none absolute -top-10 -right-16 h-[280px] w-[280px] opacity-[0.12] max-[760px]:hidden"
          aria-hidden="true"
        >
          <svg viewBox="0 0 320 320" fill="none" className="text-ink">
            <path
              d="M18 165 C54 80 117 73 150 143 C184 214 255 210 300 98 M34 218 C77 158 127 164 162 205 C204 254 254 251 303 190 M79 98 C115 37 181 39 219 91 M99 255 C132 232 166 231 203 255"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Aspect-ratio media wrapper */}
        <div className="relative aspect-video w-full overflow-hidden rounded-[20px]">
          {activeMedia.type === 'video' && activeMedia.src ? (
            <video
              ref={videoRef}
              className="h-full w-full object-contain bg-black"
              src={activeMedia.src}
              poster={activeMedia.poster}
              title={activeMedia.title}
              controls
              autoPlay
              muted
              preload="metadata"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
          ) : activeMedia.type === 'image' && activeMedia.src ? (
            <img
              className="h-full w-full object-contain bg-black"
              src={activeMedia.src}
              alt={activeMedia.alt ?? project.title}
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
            />
          ) : (
            <PlaceholderPreview title={project.title} />
          )}
        </div>

        {/* Video badge */}
        {activeMedia.type === 'video' && activeMedia.src && (
          <button
            className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-ink text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-200 hover:bg-ink/80 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
            type="button"
            onClick={toggleVideoPlayback}
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
          >
            {isVideoPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>
        )}
      </div>

      {/* ── Thumbnail strip + project prev/next nav ── */}
      <div className="flex items-center gap-4">

        {/* Thumbnails */}
        <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {media.map((item, index) => (
            <button
              key={`${item.type}-${item.src ?? (item.type === 'video' ? item.title : item.alt) ?? index
                }`}
              className={[
                'relative h-[76px] w-[124px] flex-none overflow-hidden rounded-xl border bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ink max-[760px]:h-[64px] max-[760px]:w-[104px]',
                index === activeIndex ? 'border-ink' : 'border-zinc-200',
              ].join(' ')}
              type="button"
              onClick={() => {
                videoRef.current?.pause()
                setIsVideoPlaying(false)
                setActiveIndex(index)
              }}
              aria-label={`Show media ${index + 1} for ${project.title}`}
              aria-pressed={index === activeIndex}
            >
              {item.thumbnail ||
                (item.type === 'image' && item.src) ||
                (item.type === 'video' && item.poster) ? (
                <img
                  className="h-full w-full object-cover"
                  src={item.thumbnail ?? (item.type === 'image' ? item.src : item.poster)}
                  alt=""
                  loading="lazy"
                />
              ) : item.type === 'video' ? (
                <VideoThumbnailFallback index={index} />
              ) : (
                <span className="grid h-full w-full place-items-center bg-zinc-50 font-mono text-[10px] tracking-[0.22em] text-ink/40 uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              {item.type === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-ink/10">
                  <Play size={15} fill="currentColor" className="text-ink" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      {activeMedia.caption && (
        <p className="text-[11px] leading-5 text-ink/45">{activeMedia.caption}</p>
      )}
    </div>
  )
}
