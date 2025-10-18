"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Eye, Copy, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

interface HistoryItem {
  id: string
  originalText: string
  humanizedText: string
  timestamp: Date
  originalLength: number
  humanizedLength: number
}

export default function RecentHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('humanize-history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
        setHistory(parsed)
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }
  }, [])

  const saveToHistory = (originalText: string, humanizedText: string, originalLength: number, humanizedLength: number) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      originalText,
      humanizedText,
      timestamp: new Date(),
      originalLength,
      humanizedLength
    }

    const newHistory = [newItem, ...history].slice(0, 10) // Keep only last 10 items
    setHistory(newHistory)
    localStorage.setItem('humanize-history', JSON.stringify(newHistory))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive",
      })
    }
  }

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem('humanize-history', JSON.stringify(newHistory))
    toast({
      title: "Removed",
      description: "Item removed from history.",
    })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('humanize-history')
    toast({
      title: "Cleared",
      description: "History has been cleared.",
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No history yet</p>
            <p className="text-sm">Your recent humanizations will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent History
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {formatDate(item.timestamp)}
                </Badge>
                <span className="text-xs text-gray-500">
                  {item.originalLength} → {item.humanizedLength} chars
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(item.id)}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(item.humanizedText)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromHistory(item.id)}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm">
              <p className="truncate text-gray-700">
                {item.originalText.slice(0, 100)}
                {item.originalText.length > 100 && "..."}
              </p>
              
              {expandedId === item.id && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <div className="mb-2">
                    <strong className="text-xs uppercase tracking-wide text-gray-500">Original:</strong>
                    <p className="text-sm mt-1 text-gray-700">{item.originalText}</p>
                  </div>
                  <div>
                    <strong className="text-xs uppercase tracking-wide text-gray-500">Humanized:</strong>
                    <p className="text-sm mt-1 text-green-700">{item.humanizedText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Export the saveToHistory function for use in other components
export { type HistoryItem }
