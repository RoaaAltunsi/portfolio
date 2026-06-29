// ========================== Projects ==========================
export type ProjectMedia =
  | {
    type: 'image'
    src: string
    alt: string
    thumbnail?: string
    caption?: string
    theme?: 'light' | 'dark'
    aspectRatio?: '16/9' | '4/3' | '3/2' | 'auto'
  }
  | {
    type: 'video'
    src: string
    poster?: string
    title: string
    thumbnail?: string
    caption?: string
    theme?: 'light' | 'dark'
    aspectRatio?: '16/9' | '4/3' | '3/2' | 'auto'
  }

export interface Project {
  id: string
  index: string
  title: string
  shortDescription: string
  tools: string[]
  keyFeatures?: string[]
  contribution?: string
  role?: string
  duration?: string
  team?: string
  category?: string
  status?: string
  year?: string
  liveUrl?: string
  githubUrl?: string
  additionalLinks?: {
    label: string
    href: string
    icon?: string
  }[]
  media: ProjectMedia[]
  artworkVariant?: 'figure' | 'flow' | 'group' | 'minimal'
  concept: string
  paths: string[]
}