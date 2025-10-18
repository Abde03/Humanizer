"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star, Zap } from "lucide-react"

interface AdBannerProps {
  placement: "header" | "sidebar" | "footer" | "inline"
  className?: string
}

// Google AdSense Component
function GoogleAd({ slot, format = "auto", responsive = true }: { 
  slot: string; 
  format?: string; 
  responsive?: boolean 
}) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('Ad loading error:', error)
    }
  }, [])

  return (
    <div ref={adRef} className="text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

export default function AdBanner({ placement, className = "" }: AdBannerProps) {
  // Different ad configurations based on placement
  const getAdConfig = () => {
    switch (placement) {
      case "header":
        return {
          slot: "1234567890", // Replace with your ad slot ID
          format: "horizontal",
          fallback: {
            title: "Boost Your Content Marketing",
            description: "Create engaging content that converts with our AI writing tools",
            cta: "Try Free →",
            color: "from-sky-500 to-blue-600"
          }
        }
      case "sidebar":
        return {
          slot: "2345678901",
          format: "rectangle",
          fallback: {
            title: "Premium Writing Tools",
            description: "Advanced grammar checker and style improver",
            cta: "Learn More",
            color: "from-emerald-500 to-teal-600"
          }
        }
      case "footer":
        return {
          slot: "3456789012",
          format: "horizontal",
          fallback: {
            title: "SEO Content Creator",
            description: "Generate SEO-optimized articles in minutes",
            cta: "Start Now",
            color: "from-orange-500 to-red-500"
          }
        }
      case "inline":
        return {
          slot: "4567890123",
          format: "rectangle",
          fallback: {
            title: "Content Analytics Dashboard",
            description: "Track your content performance across platforms",
            cta: "View Demo",
            color: "from-purple-500 to-indigo-600"
          }
        }
    }
  }

  const config = getAdConfig()

  // Try to show Google Ad first, fallback to custom ad
  const showGoogleAd = process.env.NODE_ENV === 'production' && typeof window !== 'undefined'

  if (showGoogleAd) {
    return (
      <div className={`${className}`}>
        <GoogleAd slot={config.slot} format={config.format} />
      </div>
    )
  }

  // Fallback custom ads with new theme
  const ad = config.fallback

  if (placement === "sidebar") {
    return (
      <Card className={`border-0 overflow-hidden shadow-lg ${className}`} style={{ background: "var(--card)", color: "var(--card-foreground)" }}>
        <CardContent className="p-0">
          <div style={{ background: "var(--accent)", color: "var(--accent-foreground)", padding: "1rem", textAlign: "center", position: "relative" }}>
            <Badge variant="secondary" className="absolute top-2 right-2 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: 0 }}>
              Sponsored
            </Badge>
            <Star className="h-8 w-8 mx-auto mb-2 opacity-90" style={{ color: "var(--primary)" }} />
            <h3 className="font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>{ad.title}</h3>
            <p className="text-xs opacity-90 mb-3" style={{ color: "var(--muted-foreground)" }}>{ad.description}</p>
            <button style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.875rem", fontWeight: 500, padding: "0.25rem 0.75rem", borderRadius: "9999px", transition: "background 0.2s", display: "flex", alignItems: "center", gap: "0.25rem", margin: "0 auto" }}>
              {ad.cta}
              <ExternalLink className="h-3 w-3" style={{ color: "var(--primary)" }} />
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden shadow-sm ${className}`} style={{ border: "1px solid var(--border)", background: "var(--card)", color: "var(--card-foreground)" }}>
      <CardContent className="p-0">
        <div className="relative p-4" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: 0 }}>
            Ad
          </Badge>
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 flex-shrink-0" style={{ color: "var(--primary)" }} />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{ad.title}</h3>
              <p className="text-xs opacity-90" style={{ color: "var(--accent-foreground)" }}>{ad.description}</p>
            </div>
            <button style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontWeight: 600 }} className="text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
              {ad.cta}
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}