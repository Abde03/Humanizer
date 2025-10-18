"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Star, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  const plans = [
    {
      name: "Free Forever",
      price: "$0",
      period: "always free",
      description: "Everything you need, completely free!",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Unlimited humanizations",
        "Up to 5,000 words per use",
        "All 5 writing styles",
        "Advanced AI bypass technology",
        "10 transformation techniques",
        "Multi-language support",
        "Real-time processing",
        "Export & copy features",
        "Community support"
      ],
      limitations: [
        "Supported by ads",
        "Community support only"
      ],
      cta: "Use Free Now",
      ctaVariant: "default" as const,
      popular: true
    },
    {
      name: "Support Us",
      price: "$5",
      period: "one-time",
      description: "Help us keep this service free for everyone",
      icon: <Star className="h-6 w-6" />,
      features: [
        "All free features (unchanged)",
        "Ad-free experience",
        "Priority support",
        "Early access to new features",
        "Supporter badge",
        "Feature request priority",
        "Monthly progress updates",
        "Our eternal gratitude ❤️"
      ],
      limitations: [],
      cta: "Support Us ❤️",
      ctaVariant: "default" as const,
      popular: false
    }
  ]

  const faqs = [
    {
      question: "Is the service really completely free?",
      answer: "Yes! All humanization features are 100% free. We're supported by ads and donations from amazing users like you."
    },
    {
      question: "What's the difference between Free and Support tiers?",
      answer: "Both have the same features! Support tier just removes ads and helps us keep the service running for everyone."
    },
    {
      question: "How do you make money with a free service?",
      answer: "We display relevant ads and accept voluntary donations from users who love the service."
    },
    {
      question: "Will you ever add paid features?",
      answer: "Nope! We believe AI text humanization should be accessible to everyone. That's our commitment."
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <span className="text-indigo-600"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you need more. No hidden fees, 
            cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-indigo-500 shadow-lg scale-105' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-indigo-600 text-white px-4 py-1 text-sm font-semibold">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center gap-3">
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Link href="/auth/signup" className="block">
                  <Button 
                    variant={plan.ctaVariant} 
                    className={`w-full py-3 text-lg ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <Check className="h-5 w-5" />
            <span className="font-semibold">30-day money-back guarantee</span>
          </div>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
