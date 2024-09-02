enum Role {
  ADMIN,
  MEMBER,
}

export interface SignInVariables {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: Role
  created_at: Date
}

export interface CreateVideoVariables {
  url: string
  duration: string
  folderId?: string
  format: '9/16' | '16/9'
  type: 'Vsl' | 'Curso'
  colorProgress?: string
  chapters?: {
    title?: string
    startTime?: string
    endTime?: string
  }[]
  fictitiousProgress?: boolean
}

export interface ViewTimestamp {
  id: string
  startTimestamp: number
  endTimestamp: number
  videoAnalyticsId: string
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
  created_at: Date
}

export interface ViewUnique {
  id: string
  videoId: string
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
  created_at: Date
}

export interface VideoAnalytics {
  id: string
  totalPlays: number
  totalViews: number
  videoId: string
  created_at: Date
  viewTimestamps: ViewTimestamp[]
  viewUnique: ViewUnique[]
}

export interface AddViewTimestamps {
  videoId: string
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
  endTimestamp: number
  startTimestamp: number
}

export interface AddViewUnique {
  videoId: string
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
}
export interface VideoMetrics {
  plays: number
  views: number
  playRate: number
  engagement: number
  uniquePlays: number
  uniqueViews: number
}

export interface GenerateUrlVariables {
  videoId: string
}

export interface ValidateUrlVariables {
  url: string
}

export interface InvalidateTokenVariables {
  token: string
}

export interface PlayerDataVariables {
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
}
export interface Video {
  id: string
  url: string
  tags: string
  duration: string
  folderId?: string
  format: '9/16' | '16/9'
  type: 'Vsl' | 'Curso'
  color?: string
  chapters?: {
    title?: string
    startTime?: string
    endTime?: string
  }[]
  fictitiousProgress?: boolean
  created_at: Date

  analytics: VideoAnalytics
}

export interface ChartProps {
  analytics: VideoAnalytics
  selectedVideo: Video
}
export interface Folder {
  id: string
  name: string
  userId: string
  created_at: Date
  videos: Video[]
}
