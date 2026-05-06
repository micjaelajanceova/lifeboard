export interface Goal {
  _id: string
  title: string
  description: string
  category: 'Health' | 'Career' | 'Finance' | 'Education' | 'Personal' | 'Other'
  trackingType: 'daily' | 'weekly' | 'monthly'
  targetDate: string
  isPublic: boolean
  imageUrl?: string
  createdAt: string
}