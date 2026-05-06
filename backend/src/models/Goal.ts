import mongoose, { Document, Schema } from 'mongoose'

export type GoalCategory = 'Health' | 'Career' | 'Finance' | 'Education' | 'Personal' | 'Other'
export type TrackingType = 'daily' | 'weekly' | 'monthly'

export interface IGoal extends Document {
  _id: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  title: string
  description: string
  category: GoalCategory
  trackingType: TrackingType
  targetDate: Date
  isPublic: boolean
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

const GoalSchema = new Schema<IGoal>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Health', 'Career', 'Finance', 'Education', 'Personal', 'Other'],
      default: 'Personal',
    },
    trackingType: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    targetDate: { type: Date, required: true },
    isPublic: { type: Boolean, default: false },
    imageUrl: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<IGoal>('Goal', GoalSchema)