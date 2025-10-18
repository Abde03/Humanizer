"use client"

import Link from "next/link"
import { Sparkles, Twitter, Github, Mail } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
    { icon: <Github className="h-4 w-4" />, href: "#", label: "GitHub" },
    { icon: <Mail className="h-4 w-4" />, href: "#", label: "Email" }
  ]

  return (
    <footer style={{ background: "var(--card)", color: "var(--card-foreground)" }}>
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <span className="text-base font-semibold" style={{ color: "var(--foreground)" }}>HumanizeAI.pro</span>
            </Link>
            <p className="text-sm max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
              Transform AI-generated text into natural, human-like content.
            </p>
            <div className="mt-1 flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="transition-opacity hover:opacity-80"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}