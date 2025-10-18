"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Copy, Check, BarChart3, FileText, Zap, Shield, TrendingDown, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { humanizeTextSchema } from "@/lib/validations"
import HumanizationSettings, { type HumanizationOptions } from "./humanization-settings"
import HumanizationTips from "./humanization-tips"
import UsageStatsFree from "./usage-stats-free"
import { z } from "zod"

interface HumanizeResponse {
  humanizedText: string
  originalLength: number
  humanizedLength: number
  userId: string
  options: HumanizationOptions
  analysis?: {
    original: {
      aiLikelihood: number
      patterns: string[]
    }
    humanized: {
      aiLikelihood: number
      improvement: number
    }
  }
  processing?: {
    passes: number
    adaptedIntensity: string
  }
}

export default function HumanizerForm() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<HumanizeResponse | null>(null)
  const [options, setOptions] = useState<HumanizationOptions>({
    style: "conversational",
    intensity: "medium",
    addEmotions: false,
    addPersonality: false
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validatedData = humanizeTextSchema.parse({ text: inputText })
      setIsLoading(true)

      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          options
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        // Handle usage limit errors specially
        if (response.status === 403 && errorData.code) {
          let title = "Usage Limit Reached"
          let description = errorData.error
          
          if (errorData.code === "attempts_exceeded") {
            title = "Monthly Attempts Exceeded"
          } else if (errorData.code === "words_exceeded") {
            title = "Text Too Long"
          } else if (errorData.code === "monthly_words_exceeded") {
            title = "Monthly Word Limit Exceeded"
          }
          
          toast({
            title,
            description,
            variant: "destructive"
          })
          return
        }
        
        throw new Error(errorData.error || "Failed to humanize text")
      }

      const data: HumanizeResponse = await response.json()
      setOutputText(data.humanizedText)
      setStats(data)

      // Save to history (localStorage)
      const historyItem = {
        id: Date.now().toString(),
        originalText: inputText,
        humanizedText: data.humanizedText,
        timestamp: new Date(),
        originalLength: data.originalLength,
        humanizedLength: data.humanizedLength,
        options: data.options
      }

      const existingHistory = JSON.parse(localStorage.getItem('humanize-history') || '[]')
      const newHistory = [historyItem, ...existingHistory].slice(0, 10)
      localStorage.setItem('humanize-history', JSON.stringify(newHistory))

      toast({
        title: "Success!",
        description: "Text has been humanized successfully.",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to humanize text. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setStats(null)
    setCopied(false)
  }

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length
  const characterCount = (text: string) => text.length

  return (
    <div className="space-y-6">
      {/* Compact Settings */}
      <HumanizationSettings options={options} onOptionsChange={setOptions} />

      {/* Modern single-card layout */}
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
  <CardContent className="p-8" style={{ background: "var(--card)", color: "var(--card-foreground)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>Input Text</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Paste your AI-generated text here... Transform it into natural, human-like content!"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[320px] resize-none border-2 rounded-xl text-sm leading-relaxed"
                style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                required
              />
              {inputText && (
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm" style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}>
                    {wordCount(inputText)} words
                  </Badge>
                </div>
              )}
            </div>
              
            {/* Input Statistics */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <span style={{ color: "var(--muted-foreground)" }}>Characters: {characterCount(inputText)}/5000</span>
              <span style={{ color: wordCount(inputText) > 500 ? "var(--destructive)" : "var(--muted-foreground)", fontWeight: wordCount(inputText) > 500 ? "bold" : "normal" }}>
                Words: {wordCount(inputText)} {wordCount(inputText) > 500 ? "⚠️" : ""}
              </span>
            </div>
            
            {wordCount(inputText) > 500 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-xs" style={{ color: "var(--destructive)" }}>
                  ⚠️ Free tier allows up to 500 words. Consider upgrading to Premium for longer texts.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={isLoading || !inputText.trim()} 
                className="flex-1 rounded-xl py-6 text-lg"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Humanize Text
                  </>
                )}
              </Button>
              
              {(inputText || outputText) && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={clearAll}
                  className="rounded-xl px-6"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" style={{ color: "var(--accent)" }} />
              <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>Humanized Text</h3>
            </div>
            {outputText && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 rounded-xl"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {outputText ? (
              <>
                <div className="p-6 rounded-xl min-h-[320px] relative" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <p className="whitespace-pre-wrap leading-relaxed text-sm" style={{ color: "var(--foreground)" }}>{outputText}</p>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" style={{ backgroundColor: "var(--card)", color: "var(--accent)" }}>
                      Humanized ✨
                    </Badge>
                  </div>
                </div>
                
                {/* Output Statistics */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span style={{ color: "var(--muted-foreground)" }}>Characters: {characterCount(outputText)}</span>
                  <span style={{ color: "var(--muted-foreground)" }}>Words: {wordCount(outputText)}</span>
                  <span style={{ color: "var(--accent)" }}>✓ Ready to use</span>
                </div>
              </>
            ) : (
              <div className="min-h-[320px] flex items-center justify-center rounded-xl" style={{ color: "var(--muted-foreground)", border: "1px dashed var(--border)", background: "color-mix(in oklab, var(--muted) 60%, transparent)" }}>
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--muted-foreground)" }} />
                  <p className="text-lg font-medium mb-2">Humanized text will appear here</p>
                  <p className="text-sm">Enter your AI-generated text and click "Humanize Text" to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
          </div>

      {/* Statistics */}
      {stats && (
        <div className="space-y-6">
          {/* AI Detection Analysis */}
          {stats.analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  AI Detection Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original Text Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Original Text
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AI Detection Score</span>
                        <span className="font-medium text-red-600">
                          {stats.analysis.original.aiLikelihood.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={stats.analysis.original.aiLikelihood} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        {stats.analysis.original.aiLikelihood > 70 ? "High AI likelihood" :
                         stats.analysis.original.aiLikelihood > 40 ? "Medium AI likelihood" :
                         "Low AI likelihood"}
                      </div>
                    </div>
                    
                    {stats.analysis.original.patterns.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Detected AI Patterns:</div>
                        <div className="space-y-1">
                          {stats.analysis.original.patterns.slice(0, 3).map((pattern, index) => (
                            <div key={index} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                              {pattern}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Humanized Text Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      Humanized Text
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AI Detection Score</span>
                        <span className="font-medium text-green-600">
                          {stats.analysis.humanized.aiLikelihood.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={stats.analysis.humanized.aiLikelihood} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        {stats.analysis.humanized.aiLikelihood > 70 ? "High AI likelihood" :
                         stats.analysis.humanized.aiLikelihood > 40 ? "Medium AI likelihood" :
                         "Low AI likelihood"}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Improvement:</div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={stats.analysis.humanized.improvement > 20 ? "default" : 
                                  stats.analysis.humanized.improvement > 10 ? "secondary" : "outline"}
                          className="bg-green-100 text-green-800"
                        >
                          -{stats.analysis.humanized.improvement.toFixed(1)}% AI likelihood
                        </Badge>
                      </div>
                      {stats.processing && (
                        <div className="text-xs text-gray-500">
                          Processed with {stats.processing.passes} pass{stats.processing.passes > 1 ? 'es' : ''} 
                          at {stats.processing.adaptedIntensity} intensity
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Processing Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.originalLength}</div>
                  <div className="text-sm text-gray-600">Original Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.humanizedLength}</div>
                  <div className="text-sm text-gray-600">Humanized Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {((stats.humanizedLength - stats.originalLength) / stats.originalLength * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Length Change</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    <Check className="h-4 w-4 mr-1" />
                    Processed
                  </Badge>
                </div>
              </div>
              
              {/* Settings Used */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{stats.options.style}</Badge>
                <Badge variant="outline">{stats.options.intensity} intensity</Badge>
                {stats.options.addEmotions && <Badge variant="outline">emotions</Badge>}
                {stats.options.addPersonality && <Badge variant="outline">personality</Badge>}
              </div>
            </CardContent>
          </Card>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Tips shown after the main form */}
      <HumanizationTips />
      
      {/* Usage Stats Sidebar */}
      <div className="lg:max-w-sm mx-auto mt-6">
        <UsageStatsFree />
      </div>
    </div>
  )
}
