import { Request, Response } from 'express'
import Goal from '../models/Goal'

export const getGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const goals = await Goal.find({ user: req.user?.id }).sort({ createdAt: -1 })
    res.json(goals)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getPublicGoals = async (_req: Request, res: Response): Promise<void> => {
  try {
    const goals = await Goal.find({ isPublic: true }).populate('user', 'username').sort({ createdAt: -1 })
    res.json(goals)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getGoalById = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user?.id })
    if (!goal) { res.status(404).json({ message: 'Goal not found' }); return }
    res.json(goal)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const createGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.create({ ...req.body, user: req.user?.id })
    res.status(201).json(goal)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!goal) { res.status(404).json({ message: 'Goal not found' }); return }
    res.json(goal)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user?.id })
    if (!goal) { res.status(404).json({ message: 'Goal not found' }); return }
    res.json({ message: 'Goal deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}