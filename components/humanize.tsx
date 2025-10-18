"use client"

import { useSession } from "next-auth/react"
import HumanizerForm from "@/components/humanizer-form"
import UsageStats from "@/components/usage-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Brain, Shield } from "lucide-react"

export default function Humanize() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Text Humanizer</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like text that bypasses AI detection
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-8">
          <UsageStats />
        </div>

        {/* Main Humanizer Interface */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Humanize Your Text</CardTitle>
          </CardHeader>
          <CardContent>
            <HumanizerForm />
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Pro Tips for Best Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">✨ Input Quality</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Paste well-structured AI-generated text</li>
                  <li>• Ensure proper grammar and spelling</li>
                  <li>• Use complete sentences and paragraphs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Style Selection</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Casual:</strong> Informal, friendly tone</li>
                  <li>• <strong>Professional:</strong> Business communication</li>
                  <li>• <strong>Creative:</strong> Engaging, expressive writing</li>
                  <li>• <strong>Conversational:</strong> Natural dialogue style</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}