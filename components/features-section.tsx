"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Shield, 
  Globe, 
  Palette, 
  Copy, 
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      title: "Lightning Fast",
      description: "Transform your AI text in under 5 seconds with our optimized humanization engine."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Bypass AI Detectors",
      description: "Advanced algorithms that make your content undetectable by AI detection tools."
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: "Multiple Writing Styles",
      description: "Choose from academic, professional, blog, creative, or conversational styles."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Multi-Language Support",
      description: "Support for English, French, and Arabic with more languages coming soon."
    },
    {
      icon: <Copy className="h-8 w-8 text-orange-600" />,
      title: "One-Click Copy",
      description: "Instantly copy your humanized text with a single click for immediate use."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-teal-600" />,
      title: "Detailed Analytics",
      description: "Track changes, word count, and humanization improvements in real-time."
    }
  ]

  const benefits = [
    "Save hours of manual rewriting",
    "Maintain original meaning and context",
    "Improve readability and engagement",
    "Professional quality output",
    "Academic integrity compliance",
    "SEO-friendly content"
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="text-indigo-600"> Perfect Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to transform AI-generated content into natural, 
            human-like writing that engages your audience.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose HumanizeAI.pro?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Our advanced AI humanization technology ensures your content 
                maintains its original meaning while becoming completely 
                undetectable and naturally engaging.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <span className="font-semibold text-gray-900">Processing Time</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Manual rewriting</span>
                      <span className="text-sm font-semibold text-red-600">2-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Other tools</span>
                      <span className="text-sm font-semibold text-orange-600">30-60 seconds</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">HumanizeAI.pro</span>
                      <span className="text-sm font-semibold text-green-600">&lt;5 seconds</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">98.7%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
