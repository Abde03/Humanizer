"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import HumanizerForm from "./humanizer-form"

export default function HeroSection() {
  const { data: session } = useSession()
  return (
  <section className="relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16" style={{ background: "var(--background)" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Header spacing for non-logged in users */}
      {!session && (
        <div className="relative container mx-auto px-4 mb-4"></div>
      )}
      
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
               style={{ background: "color-mix(in oklab, var(--primary) 15%, transparent)", color: "var(--primary)" }}>
            <Sparkles className="h-4 w-4" style={{ color: "var(--primary)" }} />
            <span>Transform AI Text to Human-Like Content</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "var(--foreground)" }}>
            Make AI Text
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--accent) 70%, var(--primary) 30%))" }}>
              {" "}Undetectable
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Transform AI-generated content into natural, human-like writing that 
            bypasses AI detectors and engages your audience authentically.
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent)" }} />
              <span>5-second processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent)" }} />
              <span>Multiple writing styles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent)" }} />
              <span>Multi-language support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent)" }} />
              <span>Free to start</span>
            </div>
          </div>

          {/* CTA buttons or Form */}
          {session ? (
            <div className="mb-12">
              <div className="max-w-6xl mx-auto">
                <HumanizerForm />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-4 text-lg bg-indigo-600 hover:bg-indigo-700">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Humanizing Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ users worldwide</p>
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 opacity-70">
              <div style={{ color: "var(--muted-foreground)" }} className="font-semibold">Students</div>
              <div className="w-px h-4" style={{ background: "var(--border)" }}></div>
              <div style={{ color: "var(--muted-foreground)" }} className="font-semibold">Professionals</div>
              <div className="w-px h-4" style={{ background: "var(--border)" }}></div>
              <div style={{ color: "var(--muted-foreground)" }} className="font-semibold">Businesses</div>
              <div className="w-px h-4" style={{ background: "var(--border)" }}></div>
              <div style={{ color: "var(--muted-foreground)" }} className="font-semibold">Freelancers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo preview */}
      <div className="relative container mx-auto px-4 mt-12 sm:mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-6 py-4" style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "color-mix(in oklab, var(--destructive) 85%, black 10%)" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.86 0.15 95)" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.86 0.15 150)" }}></div>
                <span className="ml-4 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>HumanizeAI.pro</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Input side */}
              <div className="p-6" style={{ borderRight: "1px solid var(--border)" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  AI-Generated Text
                </h3>
                <div className="p-4 rounded-lg" style={{ background: "color-mix(in oklab, var(--destructive) 15%, transparent)", border: "1px solid color-mix(in oklab, var(--destructive) 40%, transparent)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    "Artificial intelligence represents a paradigm shift in computational methodologies. 
                    The implementation of machine learning algorithms facilitates automated decision-making processes..."
                  </p>
                </div>
              </div>
              
              {/* Output side */}
              <div className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Humanized Result
                </h3>
                <div className="p-4 rounded-lg" style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    "AI is changing how we think about technology. Machine learning basically helps computers 
                    make decisions on their own, which is pretty amazing when you think about it..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
