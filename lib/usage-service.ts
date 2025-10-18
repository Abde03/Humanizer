import { db } from "@/lib/db"

const FREE_TIER_LIMITS = {
  maxAttempts: 5,
  maxWordsPerAttempt: 500,
  resetIntervalDays: 30
}

export class UsageService {
  static async checkUsageLimits(userId: string, wordCount: number) {
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("User not found")
    }

    // Check if user has active subscription
    const hasActiveSubscription = user.subscriptionStatus === 'active' && 
      user.subscriptionEnd && 
      new Date(user.subscriptionEnd) > new Date()

    if (hasActiveSubscription) {
      return { allowed: true, reason: "subscription" }
    }

    // Check if reset period has passed
    const daysSinceReset = Math.floor(
      (Date.now() - user.resetDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysSinceReset >= FREE_TIER_LIMITS.resetIntervalDays) {
      // Reset usage
      await db.user.update({
        where: { id: userId },
        data: {
          usageCount: 0,
          wordsUsed: 0,
          resetDate: new Date()
        }
      })
      
      return { allowed: true, reason: "reset" }
    }

    // Check usage limits for free tier
    if (user.usageCount >= FREE_TIER_LIMITS.maxAttempts) {
      return { 
        allowed: false, 
        reason: "attempts_exceeded",
        message: `You've reached your limit of ${FREE_TIER_LIMITS.maxAttempts} attempts this month. Upgrade to Premium for unlimited access.`
      }
    }

    if (wordCount > FREE_TIER_LIMITS.maxWordsPerAttempt) {
      return { 
        allowed: false, 
        reason: "words_exceeded",
        message: `Text is too long (${wordCount} words). Free tier allows up to ${FREE_TIER_LIMITS.maxWordsPerAttempt} words per attempt.`
      }
    }

    const totalWordsAfter = user.wordsUsed + wordCount
    const monthlyWordLimit = FREE_TIER_LIMITS.maxAttempts * FREE_TIER_LIMITS.maxWordsPerAttempt

    if (totalWordsAfter > monthlyWordLimit) {
      return { 
        allowed: false, 
        reason: "monthly_words_exceeded",
        message: `This would exceed your monthly word limit. Upgrade to Premium for unlimited access.`
      }
    }

    return { allowed: true, reason: "within_limits" }
  }

  static async recordUsage(userId: string, wordCount: number, originalText: string, humanizedText: string, style: string = "professional", language: string = "en") {
    // Update user usage
    await db.user.update({
      where: { id: userId },
      data: {
        usageCount: { increment: 1 },
        wordsUsed: { increment: wordCount }
      }
    })

    // Create humanization record
    const humanization = await db.humanization.create({
      data: {
        userId,
        originalText,
        humanizedText,
        wordCount,
        style,
        language
      }
    })

    return humanization
  }

  static async getUserUsageStats(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        humanizations: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      throw new Error("User not found")
    }

    const hasActiveSubscription = user.subscriptionStatus === 'active' && 
      user.subscriptionEnd && 
      new Date(user.subscriptionEnd) > new Date()

    const daysSinceReset = Math.floor(
      (Date.now() - user.resetDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    const daysUntilReset = FREE_TIER_LIMITS.resetIntervalDays - daysSinceReset

    return {
      usageCount: user.usageCount,
      wordsUsed: user.wordsUsed,
      maxAttempts: FREE_TIER_LIMITS.maxAttempts,
      maxWordsPerAttempt: FREE_TIER_LIMITS.maxWordsPerAttempt,
      hasActiveSubscription,
      daysUntilReset: Math.max(0, daysUntilReset),
      recentHumanizations: user.humanizations
    }
  }
}
