enum Role {
  ADMIN,
  MEMBER,
}

export interface SignInVariables {
  email: string
  password: string
}

export interface SignUpVariables {
  email: string
  name: string
  phone: string
  password: string
}

export interface LeadVariables {
  email: string
  name: string
  phone: string
  document: string
  plan: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  document: string
  password_hash: string
  accountType: string
  memberArea: string
  videoHosting: string
  role: Role
  created_at: Date
}

export interface CreateVideoVariables {
  url: string
  name: string
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

export interface CreateFolderVariables {
  name: string
  coverUrl?: string
  videosId?: string[]
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

export interface Chapters {
  title: string
  startTime: string
  endTime: string
}

export enum StatusSignature {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export enum Plan {
  FREE = 'FREE',
  ESSENTIAL = 'ESSENTIAL',
  UNLIMITED = 'UNLIMITED',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum ChargeFrequency {
  ANNUALLY = 'ANNUALLY',
  MONTHLY = 'MONTHLY',
}

export interface Signature {
  id: string;
  status: string;
  plan: string;
  ChargeFrequency: ChargeFrequency;
  price: string;
  payment_method: string;
  userId: string;
  kirvano_type?: string;
  kirvano_sale_id?: string;
  kirvano_checkout_id?: string;
  next_charge_date?: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  start_date?: Date;
  end_date?: Date;
  trial_end_date?: Date;
  created_at: Date;

  user: User;
}

// Define a interface para o botão
export interface VideoButton {
  buttonType: 'below' | 'inside'
  buttonText: string
  buttonSize: string
  buttonLink: string
  startTime: string
  endTime: string
  buttonAfterTheVideoEnds?: boolean
  backgroundColor: string
  textColor: string
  hoverBackgroundColor: string
  hoverTextColor: string
  buttonPosition?: string
}

export interface EditPlayerVideoProps {
  colorSmartPlayers?: string
  playAndPause?: boolean
  progressBar?: boolean
  timeTraveled?: boolean
  videoDuration?: boolean
  volumeButton?: boolean
  volumeBar?: boolean
  speed?: boolean
  fullscreen?: boolean
  smartAutoPlay?: boolean
  UrlCoverSmartAutoPlay?: string
  TextTopSmartAutoPlay?: string
  TextButtonSmartAutoPlay?: string
  continueWatching?: boolean
  watchingNow?: boolean
  watchingNowFontSize?: string
  watchingNowBgColor?: string
  watchingNowTextColor?: string
  ImageVideoPause?: boolean
  UrlCoverImageVideoPause?: string
  ImageOfFinished?: boolean
  UrlCoverImageOfFinished?: string
  chapterMenu?: boolean
  buttonsActive?: boolean
  Chapter?: Chapters[]
  Buttons?: VideoButton[]
}

export interface Video {
  id: string
  url: string
  tags: string
  name: string
  duration: string
  thumbnail: string
  folderId?: string
  format: '9/16' | '16/9'
  type: 'Vsl' | 'Curso'
  color?: string
  Chapter: Chapters[] | []
  VideoButtons: VideoButton[] | []
  fictitiousProgress?: boolean
  created_at: Date

  colorSmartPlayers?: string
  playAndPause?: boolean
  progressBar?: boolean
  timeTraveled?: boolean
  videoDuration?: boolean
  volumeButton?: boolean
  volumeBar?: boolean
  speed?: boolean
  fullscreen?: boolean
  smartAutoPlay?: boolean
  UrlCoverSmartAutoPlay?: string
  TextTopSmartAutoPlay?: string
  TextButtonSmartAutoPlay?: string
  continueWatching?: boolean
  watchingNow?: boolean
  watchingNowFontSize?: string
  watchingNowBgColor?: string
  watchingNowTextColor?: string
  ImageVideoPause?: boolean
  UrlCoverImageVideoPause?: string
  ImageOfFinished?: boolean
  UrlCoverImageOfFinished?: string
  chapterMenu?: boolean
  buttonsActive?: boolean
  fictitiousProgressHeight?: string
  analytics: VideoAnalytics
}

export interface ChartProps {
  analytics: VideoAnalytics
  selectedVideo: Video
}
export interface Folder {
  id: string
  name: string
  coverUrl?: string
  favorite: boolean
  userId: string
  created_at: Date
  videos: Video[]
}
