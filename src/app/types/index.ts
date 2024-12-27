export interface Message {
  id: string
  sender: string
  recipient: string
  message: string
  theme: string
  created_at: Date
  shared_count: number
}

export interface Stats {
  total_messages: number
  total_shares: number
  active_users: number
}

