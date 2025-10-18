"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, TrendingUp, Heart, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UsageStats {
  totalHumanizations: number
  wordsProcessed: number
  recentHumanizations: Array<{
    id: string
    wordCount: number
    style: string
    createdAt: string
  }>
}

export default function UsageStats() {
  const [stats, setStats] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/usage")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load usage statistics",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-4">
      {/* Usage Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Your Progress
            </CardTitle>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <Heart className="w-3 h-3 mr-1" />
              100% Free
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalHumanizations || 0}</div>
              <div className="text-xs text-blue-600">Total Uses</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.wordsProcessed ? Math.round(stats.wordsProcessed / 1000) : 0}K
              </div>
              <div className="text-xs text-green-600">Words Processed</div>
            </div>
          </div>

          {/* Free Features */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">✨ Unlimited humanizations</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">📝 Up to 5,000 words per use</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🎯 All writing styles</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">⚡ Advanced AI bypass</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
          </div>

          {/* Appreciation Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg text-center">
            <p className="text-sm text-purple-700 font-medium">
              Thanks for supporting our free platform! 🎉
            </p>
            <p className="text-xs text-purple-600">
              We keep this service free through our amazing sponsors
            </p>
          </div>

          {/* Refresh Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchStats}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Stats
          </Button>
        </CardContent>
      </Card>


      {/* Recent Activity */}
      {stats.recentHumanizations && stats.recentHumanizations.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentHumanizations.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="capitalize">{item.style}</span>
                    <span className="text-gray-500 ml-2">
                      {item.wordCount} words
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}