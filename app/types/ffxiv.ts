export type Topic = {
  description: string
  id: string
  image: string
  time: string
  timeStamp?: string
  title: string
  url: string
}

export type Maintenance = {
  id: string
  url: string
  title: string
  time: string
  timeStamp?: string
  start: string
  end: string
  current?: boolean
}

export type MaintenanceCurrent = {
  companion: Maintenance[]
  game: Maintenance[]
  lodestone: Maintenance[]
  mog: Maintenance[]
  psn: Maintenance[]
}

export type Locale = 'jp' | 'na' | 'eu' | 'fr' | 'de'
