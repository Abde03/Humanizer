"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Target, Zap, Shield, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function HumanizationTips() {
  const [showTips, setShowTips] = useState(false)

  if (!showTips) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setShowTips(true)}
        className="w-full mb-4"
      >
        <Lightbulb className="h-4 w-4 mr-2" />
        Show Tips for Better Results
      </Button>
    )
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Enhanced AI Detection Bypass
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowTips(false)}
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">For GPT-5 Content</h4>
                <p className="text-xs text-gray-600">Use "Heavy" intensity and "Conversational" style</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Best Input Length</h4>
                <p className="text-xs text-gray-600">100+ words work best. Complete paragraphs preferred</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Multiple Passes</h4>
                <p className="text-xs text-gray-600">For very AI-like text, humanize 2-3 times</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">New Features</h4>
                <p className="text-xs text-gray-600">10 advanced techniques including vocabulary diversity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-blue-200">
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">Vocabulary Diversification</Badge>
            <Badge variant="secondary" className="text-xs">Human Error Simulation</Badge>
            <Badge variant="secondary" className="text-xs">Sentence Complexity</Badge>
            <Badge variant="secondary" className="text-xs">Emotional Nuances</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}