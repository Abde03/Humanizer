"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Zap, Heart, Brain, Coffee } from "lucide-react"

export interface HumanizationOptions {
  style: "conversational" | "academic" | "blog" | "professional" | "creative"
  intensity: "light" | "medium" | "heavy"
  addEmotions: boolean
  addPersonality: boolean
}

interface HumanizationSettingsProps {
  options: HumanizationOptions
  onOptionsChange: (options: HumanizationOptions) => void
}

const styleDescriptions = {
  conversational: "Direct, engaging tone like speaking to a friend",
  academic: "Scholarly but natural language with proper citations",
  blog: "Engaging, casual writing perfect for online content",
  professional: "Polished but natural business communication style",
  creative: "Expressive with varied sentence structures and descriptive language"
}

const intensityDescriptions = {
  light: "Subtle changes while maintaining original structure",
  medium: "Balanced approach with moderate humanization",
  heavy: "Significant transformation for maximum human-like quality"
}

export default function HumanizationSettings({ options, onOptionsChange }: HumanizationSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateOptions = (updates: Partial<HumanizationOptions>) => {
    onOptionsChange({ ...options, ...updates })
  }

  const getStyleIcon = (style: string) => {
    switch (style) {
      case "conversational": return <Heart className="h-4 w-4" />
      case "academic": return <Brain className="h-4 w-4" />
      case "blog": return <Coffee className="h-4 w-4" />
      case "professional": return <Settings className="h-4 w-4" />
      case "creative": return <Zap className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
      <CardHeader className="cursor-pointer p-4 hover:bg-gray-50/80 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Humanization Settings</span>
          </div>
          <div className="flex items-center gap-2">
            {getStyleIcon(options.style)}
            <Badge variant="secondary" className="text-xs">
              {options.style} • {options.intensity}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Style Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Writing Style</label>
            <Select value={options.style} onValueChange={(value) => updateOptions({ style: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversational">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Conversational
                  </div>
                </SelectItem>
                <SelectItem value="academic">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Academic
                  </div>
                </SelectItem>
                <SelectItem value="blog">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Blog
                  </div>
                </SelectItem>
                <SelectItem value="professional">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Professional
                  </div>
                </SelectItem>
                <SelectItem value="creative">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Creative
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">{styleDescriptions[options.style]}</p>
          </div>

          {/* Intensity Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Humanization Intensity</label>
            <div className="grid grid-cols-3 gap-2">
              {(["light", "medium", "heavy"] as const).map((intensity) => (
                <Button
                  key={intensity}
                  variant={options.intensity === intensity ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateOptions({ intensity })}
                  className="text-xs"
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-600">{intensityDescriptions[options.intensity]}</p>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Additional Features</label>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Add Emotional Expressions</div>
                <div className="text-xs text-gray-600">Include emotional words and expressions</div>
              </div>
              <Button
                variant={options.addEmotions ? "default" : "outline"}
                size="sm"
                onClick={() => updateOptions({ addEmotions: !options.addEmotions })}
              >
                {options.addEmotions ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Add Personality Traits</div>
                <div className="text-xs text-gray-600">Include personal opinions and perspectives</div>
              </div>
              <Button
                variant={options.addPersonality ? "default" : "outline"}
                size="sm"
                onClick={() => updateOptions({ addPersonality: !options.addPersonality })}
              >
                {options.addPersonality ? "On" : "Off"}
              </Button>
            </div>
          </div>

          {/* Reset to Defaults */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOptionsChange({
              style: "conversational",
              intensity: "medium",
              addEmotions: false,
              addPersonality: false
            })}
            className="w-full"
          >
            Reset to Defaults
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
